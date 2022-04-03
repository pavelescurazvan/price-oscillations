import axios from "axios";

const API_URL = 'http://localhost:8080'

export const ticker = {
  getCurrencies: async () => {
    return axios.get('https://api.uphold.com/v0/assets');
  },
  getTickersForCurrency: async (currency: string) => {
    return axios.get(`https://api.uphold.com/v0/ticker/${currency}`);
  },
  getTickersForCurrencyPair: async (currencyPair: string) => {
    const response = await axios.get(`https://api.uphold.com/v0/ticker/${currencyPair}`);

    console.log("response", response);

    return [];
  }
}