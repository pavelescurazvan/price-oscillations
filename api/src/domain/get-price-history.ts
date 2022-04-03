import {GetPriceHistory, Repository} from "../domain";
import axios from "axios";
import {config} from "../config";


/**
 * Get price history
 */
export const createGetPriceHistory = (repository: Repository): GetPriceHistory => async ({currencyPair, numberOfDays, periodInMS}: {
  currencyPair: string,
  numberOfDays: number,
  periodInMS: number
}) => {
  const lastPrice = await repository.getLastPrice(currencyPair);

  if (isPriceOld(periodInMS, lastPrice)) {
    await refreshCurrencyPairPrice({repository, currencyPair});
  }

  return await repository.getPriceHistory({currencyPair, numberOfDays, periodInMS});
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
 * @param periodInMS
 * @param lastPrice
 */
const isPriceOld = (periodInMS: number, lastPrice: {
  amount: string,
  currency_pair: string,
  date: Date
}) => {
  if (!lastPrice) return true;

  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - lastPrice.date.getTime();

  return (timeDiff > periodInMS);
}