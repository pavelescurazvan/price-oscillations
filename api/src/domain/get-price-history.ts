import {GetPriceHistory, Repository} from "../domain";
import axios from "axios";
import {config} from "../config";

// @ts-ignore
const FIVE_MINUTES_IN_MS = 300000;
const FIVE_SECONDS_IN_MS = 5000;

/**
 * Get price history
 */
export const createGetPriceHistory = (repository: Repository): GetPriceHistory => async ({currencyPair, numberOfDays}: {
  currencyPair: string,
  numberOfDays: number
}) => {
  const lastPrice = await repository.getLastPrice(currencyPair);

  if (isPriceOld(lastPrice)) {
    console.log("price is old");
    await refreshCurrencyPairPrice({repository, currencyPair});
  } else {
    console.log("price is not old");
  }

  return await repository.getPriceHistory({currencyPair, numberOfDays});
}

/**
 * Fetches the updated currency pair price
 * Updates the price in the repository
 * @param repository
 * @param currencyPair
 */
const refreshCurrencyPairPrice = async ({repository, currencyPair} : {
  repository: Repository,
  currencyPair: string
}) => {
  const response = await axios.get(`${config.upholdAPIURL}/ticker/${currencyPair}`);
  const {ask: amount} = response.data;

  await repository.addPrice({amount, currencyPair});
}

/**
 * Figures if the price is old or not
 * @param lastPrice
 */
const isPriceOld = (lastPrice: {
  amount: string,
  currency_pair: string,
  date: Date
}) => {
  if (!lastPrice) return true;

  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - lastPrice.date.getTime();

  return (timeDiff > FIVE_SECONDS_IN_MS);
}