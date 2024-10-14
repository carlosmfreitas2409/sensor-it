#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Preferences.h>

#include <EmonLib.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <arduinoFFT.h>
#include <max6675.h>

#include "secrets.h"

#include "provisioning/BLEProvisioning.h"

#define VIBRATION_PIN 14
#define THERMO_DO_PIN 19
#define THERMO_CS_PIN 2
#define THERMO_CLK_PIN 18
#define ACS_ADS_PIN 35
#define SCT_PIN 34

#define SAMPLES 256
#define SAMPLING_FREQUENCY 1000

String ssid, password;
bool usingBLE = true;

double ax[SAMPLES];
double vReal[SAMPLES];
double vImag[SAMPLES];
double amplitudeVibrationX;

Preferences preferences;
BLEProvisioning bleProvisioning;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

MAX6675 thermocouple(THERMO_CLK_PIN, THERMO_CS_PIN, THERMO_DO_PIN);
Adafruit_MPU6050 mpu;
ArduinoFFT<double> FFT = ArduinoFFT<double>(vReal, vImag, SAMPLES, SAMPLING_FREQUENCY);
EnergyMonitor emon;

void wifiEventHandler(arduino_event_t *event) {
  switch (event->event_id) {
    case ARDUINO_EVENT_WIFI_STA_CONNECTED:
      if (usingBLE) {
        bleProvisioning.set_wifi_status(STATUS_CONNECTED);
      }
      break;
    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
      if (usingBLE) {
        bleProvisioning.set_bad_credentials();
        bleProvisioning.set_wifi_status(STATUS_DISCONNECTED);
      }

      break;
    case ARDUINO_EVENT_WIFI_STA_GOT_IP:
      if (usingBLE) {
        bleProvisioning.set_wifi_status(STATUS_GOT_IP);
      }

      break;
  }
}

String scanNetworks() {
  DynamicJsonDocument doc(1024);
  JsonArray networks = doc.createNestedArray("networks");

  int n = WiFi.scanNetworks();

  if (n == 0) {
    Serial.println("No networks found");
  }

  for (int i = 0; i < n; ++i) {
    JsonObject network = networks.createNestedObject();
    network["ssid"] = WiFi.SSID(i);
    network["rssi"] = WiFi.RSSI(i);
    network["encryption"] = WiFi.encryptionType(i);
  }

  WiFi.scanDelete();

  String output;
  serializeJson(doc, output);

  return output;
}

void connectToMQTT() {
  while (!mqttClient.connected()) {
    String clientId = DEVICE_NAME + String("-" + WiFi.macAddress());

    Serial.printf("Connecting to MQTT Broker as %s.....\n", clientId.c_str());

    if (mqttClient.connect(clientId.c_str(), MQTT_USERNAME, MQTT_PASSWORD)) {
      Serial.println("Connected to MQTT broker!");
    } else {
      Serial.print("Failed to connect to MQTT broker, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void saveWiFiCredentials(const String &ssid, const String &password) {
  preferences.begin("wifi", false);
  preferences.putString("ssid", ssid);
  preferences.putString("password", password);
  preferences.end();
}

bool loadWiFiCredentials(String &ssid, String &password) {
  preferences.begin("wifi", false);
  ssid = preferences.getString("ssid", "");
  password = preferences.getString("password", "");
  preferences.end();
  
  return ssid.length() > 0;
}

void createConnections(void *param) {
  if (usingBLE) {
    ssid = bleProvisioning.wifi_ssid.c_str();
    password = bleProvisioning.wifi_password.c_str();
  }

  WiFi.begin(ssid, password);

  Serial.println("\nConnecting");

  if (usingBLE) {
    bleProvisioning.set_wifi_status(STATUS_CONNECTING);
  }

  while (WiFi.status() != WL_CONNECTED && !bleProvisioning.is_bad_credentials()) {
    Serial.print(".");
    delay(100);
  }


  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to the WiFi network");

    if (usingBLE) {
      saveWiFiCredentials(
        bleProvisioning.wifi_ssid.c_str(),
        bleProvisioning.wifi_password.c_str()
      );
    }

    while (true) {
      if (!mqttClient.connected()) {
        connectToMQTT();
      }

      mqttClient.loop();
    }
  }

  // vTaskDelete(NULL);
}

void onWiFiCredentialsReady() {
  xTaskCreate(createConnections, "ConnectTask", 10000, NULL, 1, NULL);
}

void captureVibration(void *param) {
  while (true) {
    if (mqttClient.connected()) {
      for (int i = 0; i < SAMPLES; i++) {
        sensors_event_t a, g, temp;
        mpu.getEvent(&a, &g, &temp);

        ax[i] = a.acceleration.x;

        vReal[i] = ax[i];
        vImag[i] = 0;

        vTaskDelay((1000 / SAMPLING_FREQUENCY) / portTICK_PERIOD_MS);
      }

      FFT.windowing(vReal, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
      FFT.compute(vReal, vImag, SAMPLES, FFT_FORWARD);
      FFT.complexToMagnitude(vReal, vImag, SAMPLES);

      int peakIndex = FFT.majorPeak(vReal, SAMPLES, SAMPLING_FREQUENCY);

      // peakIndex * (SAMPLING_FREQUENCY / SAMPLES)
      int peakIndexParabola = FFT.majorPeakParabola(vReal, SAMPLES, SAMPLING_FREQUENCY);
      
      DynamicJsonDocument doc(1024);

      doc["serialNumber"] = WiFi.macAddress();
      doc["type"] = "vibration";
      doc["value"] = peakIndexParabola;

      String output;
      serializeJson(doc, output);

      Serial.println(output);

      mqttClient.publish("hardware.add-metrics", output.c_str());
    }
    
    vTaskDelay(3000 / portTICK_PERIOD_MS);
  }
}

void captureTemperature(void *param) {
  while (true) {
    if (mqttClient.connected()) {
      DynamicJsonDocument doc(1024);

      doc["serialNumber"] = WiFi.macAddress();
      doc["type"] = "temperature";
      doc["value"] = thermocouple.readCelsius();

      String output;
      serializeJson(doc, output);

      mqttClient.publish("hardware.add-metrics", output.c_str());
    }

    vTaskDelay(15000 / portTICK_PERIOD_MS);
  }
}

void captureCurrent(void *param) {
  while (true) {
    if (mqttClient.connected()) {
      double Irms = emon.calcIrms(1480);

      DynamicJsonDocument doc(1024);

      doc["serialNumber"] = WiFi.macAddress();
      doc["type"] = "current";
      doc["value"] = Irms;

      String output;
      serializeJson(doc, output);

      mqttClient.publish("hardware.add-metrics", output.c_str());
    }

    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

void capturePower(void *param) {
  while (true) {
    if (mqttClient.connected()) {
      double Irms = emon.calcIrms(1480);

      int potencia = Irms * 127;

      DynamicJsonDocument doc(1024);

      doc["serialNumber"] = WiFi.macAddress();
      doc["type"] = "real_power";
      doc["value"] = potencia;

      String output;
      serializeJson(doc, output);

      mqttClient.publish("hardware.add-metrics", output.c_str());
    }

    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(VIBRATION_PIN, INPUT);

  if (!mpu.begin()) {
    Serial.println("Falha ao inicializar o MPU6050. Verifique a conexão.");
    while (1);
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_2_G);
  
  emon.current(SCT_PIN, 111.1);

  WiFi.mode(WIFI_STA);
  WiFi.onEvent(wifiEventHandler, ARDUINO_EVENT_MAX);

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);

  if (loadWiFiCredentials(ssid, password)) {
    Serial.println("Found saved Wi-Fi credentials, trying to connect...");

    usingBLE = false;

    onWiFiCredentialsReady();
  } else {
    bleProvisioning.set_on_credentials_ready_callback(&onWiFiCredentialsReady);
    bleProvisioning.set_networks_scan_callback(&scanNetworks);
    bleProvisioning.init(DEVICE_NAME, DEVICE_MODEL, WiFi.macAddress().c_str());
  }

  xTaskCreate(captureTemperature, "CaptureTemperatureTask", 5000, NULL, 1, NULL);
  xTaskCreate(captureVibration, "CaptureVibrationTask", 5000, NULL, 1, NULL);
  xTaskCreate(captureCurrent, "CaptureCurrentTask", 5000, NULL, 1, NULL);
  xTaskCreate(capturePower, "CapturePowerTask", 5000, NULL, 1, NULL);
}

void loop() {}