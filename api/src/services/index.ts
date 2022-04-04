import axios from "axios";
import {config} from "../config";

export type FetchCurrencyPairPriceService = (currencyPair: string) => Promise<{amount: string, currencyPair: string}>

/**
 * Fetches the updated currency pair price
 * @param currencyPair
 */
export const fetchCurrencyPairPriceService = async (currencyPair: string) => {
  const response = await axios.get(`${config.upholdAPIURL}/ticker/${currencyPair}`);
  const {ask: amount} = response.data;

  return {amount, currencyPair};
}