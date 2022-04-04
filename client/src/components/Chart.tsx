import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area, ReferenceLine } from 'recharts';

import Options from './Options';
import './Chart.css';
import {ticker} from '../adapters';

type ChartProps = {
  example: string
};

type TickerRecord = {
  date: Date
  amount: number
};

type ChartState = {
  priceThresholdMarker: number
  currencyPair: string
  fetchIntervalInMilliseconds: number
  intervalId?: NodeJS.Timer
  data: TickerRecord[]
};

export default class Chart extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props)

    this.state = {
      priceThresholdMarker: 46100,
      currencyPair: 'BTC-USD',
      fetchIntervalInMilliseconds: 60000,
      data: []
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

    this.refreshData(event.currentTarget.value, this.state.fetchIntervalInMilliseconds);
  }

  handleFetchIntervalChange = async (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({fetchIntervalInMilliseconds: Number(event.currentTarget.value)});

    this.configureRefreshInterval(Number(event.currentTarget.value));
  };

  configureRefreshInterval = (fetchIntervalInMilliseconds: number) => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }

    const intervalId = setInterval(() => {
      this.refreshData(this.state.currencyPair, fetchIntervalInMilliseconds);
    }, fetchIntervalInMilliseconds);

    this.setState({intervalId});
  }

  refreshData = async (currencyPair: string, fetchIntervalInMilliseconds: number) => {
    const data = await ticker.getTickersForCurrencyPair({
      currencyPair,
      fetchIntervalInMilliseconds
    });

    console.log('data refreshed', data);

    this.setState({data});
  }

  componentDidMount = async () => {
    await this.refreshData(this.state.currencyPair, this.state.fetchIntervalInMilliseconds);

    this.configureRefreshInterval(this.state.fetchIntervalInMilliseconds);
  }

  render() {
    return (
      <div className="line-chart-wrapper">
        <p>{this.state.currencyPair} price - rate updated every {this.state.fetchIntervalInMilliseconds / 60 / 1000} minute</p>

        <Options
          priceThresholdMarker={this.state.priceThresholdMarker}
          currencyPair={this.state.currencyPair}
          fetchIntervalInMilliseconds={this.state.fetchIntervalInMilliseconds}
          onPriceChange={this.handlePriceThresholdMarkerChange}
          onCurrencyPairChange={this.handleCurrencyPairChange}
          onFetchIntervalChange={this.handleFetchIntervalChange}
        />

        <LineChart
          width={1024} height={400} data={this.state.data}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >

          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" label="" />
          <YAxis domain={['auto', 'auto']} label="" />
          <Tooltip
            wrapperStyle={{
              borderColor: 'white',
              boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
            }}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
          />
          <Line dataKey="amount" stroke="#ff7300" dot={false} />

          <ReferenceLine y={this.state.priceThresholdMarker} label="Price Threshold" stroke="red" strokeDasharray="3 3" />

          <Brush dataKey="date" startIndex={this.state.data.length - 10}>
            <AreaChart>
              <CartesianGrid />
              <YAxis hide domain={['auto', 'auto']} />
              <Area dataKey="amount" stroke="#ff7300" fill="#ff7300" dot={false} />
            </AreaChart>
          </Brush>
        </LineChart>
      </div>
    );
  }
}
