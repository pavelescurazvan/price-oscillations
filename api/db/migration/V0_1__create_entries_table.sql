CREATE SCHEMA IF NOT EXISTS tickers;

CREATE TABLE tickers.entries (
  id BIGSERIAL PRIMARY KEY,
  amount BIGINT NOT NULL,
  currency_pair TEXT NOT NULL,
  date DATE NOT NULL DEFAULT now()
);
