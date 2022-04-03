import axios from "axios";

const API_URL = 'http://localhost:8080'

export const ticker = {
  getCurrencies: async () => {
    return axios.get(`${API_URL}/currencies`);
  },
  getTickersForCurrency: async (currency: string) => {
    return axios.get(`${API_URL}/currency-tickers/${currency}`);
  },
  getTickersForCurrencyPair: async (currencyPair: string) => {
    const response = await axios.get(`${API_URL}/currency-pair-ticker/${currencyPair}`);

    return response.data;
  }
}