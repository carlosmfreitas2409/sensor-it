#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <aWOT.h>

#include "secrets.h"

#include "provisioning/BLEProvisioning.h"

BLEProvisioning bleProvisioning;

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

void onCredentialsReady() {
  xTaskCreate(connectToWiFi, "ConnectTask", 10000, NULL, 1, NULL);
}

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  WiFi.onEvent(wifiEventHandler, ARDUINO_EVENT_MAX);

  bleProvisioning.set_on_credentials_ready_callback(&onCredentialsReady);
  bleProvisioning.set_networks_scan_callback(&scanNetworks);
  bleProvisioning.init(DEVICE_NAME, DEVICE_MODEL, WiFi.macAddress().c_str());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    return;
  }
}