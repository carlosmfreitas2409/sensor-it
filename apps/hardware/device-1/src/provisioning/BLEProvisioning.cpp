#include <Arduino.h>

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#include <qrcode.h>

#include "BLEProvisioning.h"

void create_network_scan_characteristic(BLEService *service, BLECharacteristicCallbacks *pCallbacks) {
  BLECharacteristic *c = service->createCharacteristic(
    BP_NETWORK_SCAN_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_NOTIFY
  );

  c->addDescriptor(new BLE2902());

  c->setCallbacks(pCallbacks);
  c->setValue("Networks");
}

void create_wifi_ssid_characteristic(BLEService *service, BLECharacteristicCallbacks *pCallbacks) {
  BLECharacteristic *c = service->createCharacteristic(
    BP_WIFI_SSID_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );

  c->setCallbacks(pCallbacks);
  c->setValue("SSID");
}

void create_wifi_password_characteristic(BLEService *service, BLECharacteristicCallbacks *pCallbacks) {
  BLECharacteristic *c = service->createCharacteristic(
    BP_WIFI_PASS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );

  c->setCallbacks(pCallbacks);
  c->setValue("Password");
}

BLECharacteristic *create_wifi_status_characteristic(BLEService *service) {
  BLECharacteristic *c = service->createCharacteristic(
    BP_WIFI_STATUS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );

  c->addDescriptor(new BLE2902());

  c->setValue(STATUS_READY);

  return c;
}

void create_scan_status_characteristic(BLEService *service, BLECharacteristicCallbacks *pCallbacks) {
  BLECharacteristic *c = service->createCharacteristic(
    BP_SCAN_STATUS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );

  c->setCallbacks(pCallbacks);
  c->setValue("PENDING");
}

void printQR(const char *name, const char *model, const char *snid) {
  char payload[150] = {0};

  snprintf(
    payload, sizeof(payload),
    "{\"name\":\"%s\",\"transport\":\"%s\",\"model\":\"%s\",\"serialNumber\":\"%s\"}",
    name, "ble", model, snid
  );

  esp_qrcode_config_t cfg = ESP_QRCODE_CONFIG_DEFAULT();
  esp_qrcode_generate(&cfg, payload);
}

void BLEProvisioning::init(const char *name, const char *model, const char *snid) {
  BLEDevice::init(name);
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(BP_SERVICE_UUID);

  create_network_scan_characteristic(pService, this);
  create_wifi_ssid_characteristic(pService, this);
  create_wifi_password_characteristic(pService, this);
  this->_status_char = create_wifi_status_characteristic(pService);
  create_scan_status_characteristic(pService, this);
  
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(BP_SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);

  BLEDevice::startAdvertising();

  printQR(name, model, snid);
}

void BLEProvisioning::onWrite(BLECharacteristic *c) {
  if (c->getUUID().toString().compare(BP_WIFI_SSID_CHAR_UUID) == 0) {
    this->wifi_ssid = c->getValue();
    this->_credentials_status |= 1 << WIFI_SSID_SET_BIT;
  } else if (c->getUUID().toString().compare(BP_WIFI_PASS_CHAR_UUID) == 0) {
    this->wifi_password = c->getValue();
    this->_credentials_status |= 1 << WIFI_PASS_SET_BIT;
  } else if (c->getUUID().toString().compare(BP_NETWORK_SCAN_CHAR_UUID) == 0) {
    String output = this->_scan_callback();

    if (output.length() > MAX_ATTR_LEN) {
      int chunks = ceil((double)output.length() / (double)MAX_ATTR_LEN);
      int start = 0;
      int end = MAX_ATTR_LEN;

      for (int i = 0; i < chunks; i++) {
        String chunk = output.substring(start, end);
        c->setValue(chunk.c_str());
        c->notify();

        start = end;
        end = end + MAX_ATTR_LEN;
      }
    } else {
      c->setValue(output.c_str());
      c->notify();
    }
  } else if (c->getUUID().toString().compare(BP_SCAN_STATUS_CHAR_UUID) == 0) {
    if (c->getValue().compare("COMPLETED") == 0) {
      BLEDevice::deinit(true);
    }
  }

  if (
    this->_credentials_status & (1 << WIFI_SSID_SET_BIT) && 
    this->_credentials_status & (1 << WIFI_PASS_SET_BIT)
  ) {
    this->_credentials_status = 0;
    this->_callback();
  }
}

void BLEProvisioning::set_on_credentials_ready_callback(t_void_func callback) {
  this->_callback = callback;
};

void BLEProvisioning::set_networks_scan_callback(t_string_func callback) {
  this->_scan_callback = callback;
};

void BLEProvisioning::set_wifi_status(const char *status) {
  this->_status_char->setValue(status);
  this->_status_char->notify();
}

void BLEProvisioning::set_bad_credentials() {
  this->_credentials_status |= (1 << WIFI_BAD_CREDENTIALS_BIT);
}

bool BLEProvisioning::is_bad_credentials() {
  return this->_credentials_status & (1 << WIFI_BAD_CREDENTIALS_BIT);
}