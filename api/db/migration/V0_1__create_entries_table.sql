CREATE SCHEMA IF NOT EXISTS tickers;

CREATE TABLE tickers.entries (
  id BIGSERIAL PRIMARY KEY,
  currency_pair TEXT NOT NULL,
  date DATE NOT NULL,
  price BIGINT NOT NULL
);
