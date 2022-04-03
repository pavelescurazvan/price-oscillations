import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area } from 'recharts';

import Options from './Options';
import './Chart.css';
import {ticker} from '../adapters';

type ChartProps = {
  example: string;
};

type TickerRecord = {
  date: string,
  price: number
};

// TODO: Use redux ton manage state
type ChartState = {
  priceThresholdMarker: number;
  currencyPair: string;
  fetchIntervalInMinutes: number;
  data: TickerRecord[]
};

export default class Chart extends React.Component<ChartProps, ChartState> {
  constructor(props: ChartProps) {
    super(props)

    this.state = {
      priceThresholdMarker: 1000,
      currencyPair: 'USD-BTC',
      fetchIntervalInMinutes: 5,
      data: []
    };

  }

  async componentDidMount() {
    const data = await ticker.getTickersForCurrencyPair(this.state.currencyPair)

    console.log("componentDidMount data", data);

    this.setState({ data})
  }

  render() {
    return (
      <div className="line-chart-wrapper">
        <Options example={"test 123"}/>

        <LineChart
          width={1024} height={400} data={this.state.data}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" label="Date" />
          <YAxis domain={['auto', 'auto']} label="Price" />
          <Tooltip
            wrapperStyle={{
              borderColor: 'white',
              boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
            }}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
          />
          <Line dataKey="amount" stroke="#ff7300" dot={false} />
          <Brush dataKey="date" startIndex={this.state.data.length - 40}>
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
