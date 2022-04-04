import React from 'react';

type OptionsProps = {
  priceThresholdMarker: number,
  currencyPair: string,
  fetchIntervalInMilliseconds: number
  onPriceChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onCurrencyPairChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  onFetchIntervalChange: (event: React.FormEvent<HTMLSelectElement>) => void;
};

type OptionsState = {
  priceThresholdMarker: number;
  currencyPair: string;
  fetchIntervalInMilliseconds: number;
};

export default class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps) {
    super(props)

  }

  render() {
    return (
      <div>
        <form>
          <label>
            Price Threshold Marker:
            <input type="text" value={this.props.priceThresholdMarker} onChange={this.props.onPriceChange}/>
          </label>

          <label>
            Currency Pair:
            <select value={this.props.currencyPair} onChange={this.props.onCurrencyPairChange}>
              <option value="USD-BTC">USD-BTC</option>
              <option value="USD-ETH">USD-ETH</option>
            </select>
          </label>

          <label>
            Fetch Interval:
            <select value={this.props.fetchIntervalInMilliseconds} onChange={this.props.onFetchIntervalChange}>
              <option value="5000">5 seconds</option>
              <option value="10000">10 seconds</option>
              <option value="60000">1 minute</option>
              <option value="300000">5 minutes</option>
              <option value="600000">10 minutes</option>
              <option value="900000">15 minutes</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}