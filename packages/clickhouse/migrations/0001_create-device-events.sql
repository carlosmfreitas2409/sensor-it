CREATE TABLE device_events (
  timestamp DateTime('UTC') DEFAULT now(),
  serial_number LowCardinality(String),
  type LowCardinality(String),
  value UInt32
)
ENGINE = MergeTree
  PARTITION BY toYYYYMM(timestamp)
  ORDER BY (toStartOfHour(timestamp), serial_number, timestamp)
  PRIMARY KEY (toStartOfHour(timestamp), serial_number);
