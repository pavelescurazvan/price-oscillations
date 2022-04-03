import axios from "axios";

export const ticker = {
  getCurrencies: () => {
    return axios.get('https://api.uphold.com/v0/assets');
  },
  getTickersForCurrency: (currency: string) => {
    return axios.get(`https://api.uphold.com/v0/ticker/${currency}`);
  },
  getTickersForCurrencyPair: (currencyPair: string) => {
    return axios.get(`https://api.uphold.com/v0/ticker/${currencyPair}`);
  }
}