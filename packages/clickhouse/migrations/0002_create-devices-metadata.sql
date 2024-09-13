CREATE TABLE devices_metadata (
  timestamp DateTime('UTC') DEFAULT now(),
  organization_id UUID,
  device_id UUID,
  serial_number String,
  created_at DateTime64(3),
  deleted UInt8 DEFAULT 0
)
ENGINE = MergeTree
  PARTITION BY toYYYYMM(timestamp)
  ORDER BY (toStartOfHour(timestamp), device_id, organization_id, timestamp)
  PRIMARY KEY (toStartOfHour(timestamp), device_id, organization_id);
