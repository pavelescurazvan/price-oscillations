import React from 'react';

type OptionsProps = {
  example: string;
};

type OptionsTate = {
  priceThresholdMarker: number;
  currencyPair: string;
  fetchIntervalInMinutes: number;
};

export default class Options extends React.Component<OptionsProps, OptionsTate> {
  constructor(props: OptionsProps) {
    super(props)

    this.state = {
      priceThresholdMarker: 1000,
      currencyPair: 'USD/BTC',
      fetchIntervalInMinutes: 5
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
    this.setState({ fetchIntervalInMinutes: Number(event.currentTarget.value) });
  };

  render() {
    return (
      <div>
        <p>{this.state.currencyPair} price - rate updated every {this.state.fetchIntervalInMinutes} minutes </p>

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
            Fetch Internval:
            <select value={this.state.fetchIntervalInMinutes} onChange={this.handleFetchIntervalChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}