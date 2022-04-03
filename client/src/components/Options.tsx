import React from 'react';

type OptionsProps = {
  example: string;
};

type OptionsState = {
  priceThresholdMarker: number;
  currencyPair: string;
  fetchIntervalInMilliseconds: number;
};

export default class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps) {
    super(props)

    this.state = {
      priceThresholdMarker: 1000,
      currencyPair: 'USD/BTC',
      fetchIntervalInMilliseconds: 60000
    };

    this.handlePriceThresholdMarkerChange = this.handlePriceThresholdMarkerChange.bind(this);
    this.handleCurrencyPairChange = this.handleCurrencyPairChange.bind(this);
    this.handleFetchIntervalChange = this.handleFetchIntervalChange.bind(this);
  }

  handlePriceThresholdMarkerChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({priceThresholdMarker: Number(event.currentTarget.value)});
  }

  handleCurrencyPairChange(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({currencyPair: event.currentTarget.value});
  }

  handleFetchIntervalChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ fetchIntervalInMilliseconds: Number(event.currentTarget.value) });
  };

  render() {
    return (
      <div>
        <p>{this.state.currencyPair} price - rate updated every {this.state.fetchIntervalInMilliseconds / 60 / 1000} minute</p>

        <form>
          <label>
            Price Threshold Marker:
            <input type="text" value={this.state.priceThresholdMarker} onChange={this.handlePriceThresholdMarkerChange}/>
          </label>

          <label>
            Currency Pair:
            <select value={this.state.currencyPair} onChange={this.handleCurrencyPairChange}>
              <option value="USD/BTC">USD/BTC</option>
              <option value="USD/ETH">USD/ETH</option>
              <option value="USD/EGLD">USD/EGLD</option>
            </select>
          </label>

          <label>
            Fetch Interval:
            <select value={this.state.fetchIntervalInMilliseconds} onChange={this.handleFetchIntervalChange}>
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