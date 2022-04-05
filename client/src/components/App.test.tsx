import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App component renders text labels ', () => {
  render(<App />);

  const priceThresholdMarker = screen.getByText(/Price Threshold Marker/i);
  expect(priceThresholdMarker).toBeInTheDocument();

  const currencyPair = screen.getByText(/Currency Pair/i);
  expect(currencyPair).toBeInTheDocument();

  const fetchInterval = screen.getByText(/Fetch Interval/i);
  expect(fetchInterval).toBeInTheDocument();
});
