#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

#include "secrets.h"

#include "provisioning/BLEProvisioning.h"

unsigned long lastMsg = 0;
bool flag = 0;

BLEProvisioning bleProvisioning;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void wifiEventHandler(arduino_event_t *event) {  
  switch (event->event_id) {
    case ARDUINO_EVENT_WIFI_STA_CONNECTED:
      bleProvisioning.set_wifi_status(STATUS_CONNECTED);
      break;
    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
      bleProvisioning.set_bad_credentials();
      bleProvisioning.set_wifi_status(STATUS_DISCONNECTED);
      break;
    case ARDUINO_EVENT_WIFI_STA_GOT_IP:
      bleProvisioning.set_wifi_status(STATUS_GOT_IP);
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

void connectToWiFi(void *param) {
  WiFi.begin(
    bleProvisioning.wifi_ssid.c_str(),
    bleProvisioning.wifi_password.c_str()
  );

  bleProvisioning.set_wifi_status(STATUS_CONNECTING);
  Serial.println("\nConnecting");

  while (WiFi.status() != WL_CONNECTED && !bleProvisioning.is_bad_credentials()) {
    Serial.print(".");
    delay(100);
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to the WiFi network");
  }

  vTaskDelete(NULL);
}

void onWiFiCredentialsReady() {
  xTaskCreate(connectToWiFi, "ConnectTask", 10000, NULL, 1, NULL);
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

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  WiFi.onEvent(wifiEventHandler, ARDUINO_EVENT_MAX);

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);

  bleProvisioning.set_on_credentials_ready_callback(&onWiFiCredentialsReady);
  bleProvisioning.set_networks_scan_callback(&scanNetworks);
  bleProvisioning.init(DEVICE_NAME, DEVICE_MODEL, WiFi.macAddress().c_str());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    return;
  }

  if (!mqttClient.connected()) {
    connectToMQTT();
  }

  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastMsg > 10000) {
    lastMsg = now;
    if (flag == 0) {
      mqttClient.publish("hardware.add-metric", "000");
      // Serial.println("000");
    } else {
      mqttClient.publish("hardware.add-metric", "111");
      // Serial.println("111");
    }
    flag = !flag;
  }
}