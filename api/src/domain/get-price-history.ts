import {GetPriceHistory, Repository} from "../domain";
import {FetchCurrencyPairPriceService} from "../services";


/**
 * Create get price history
 */
export const createGetPriceHistory = ({repository, fetchCurrencyPairPriceService}: {
  repository: Repository,
  fetchCurrencyPairPriceService: FetchCurrencyPairPriceService
}): GetPriceHistory => async ({currencyPair, periodInMS}: {
  currencyPair: string,
  periodInMS: number
}) => {
  const lastPrice = await repository.getLastPrice(currencyPair);

  if (isPriceOld(periodInMS, lastPrice)) {
    await refreshCurrencyPairPrice({repository, fetchCurrencyPairPriceService, currencyPair});
  }

  return await repository.getPriceHistory({currencyPair, periodInMS});
}

/**
 * Fetches the updated currency pair price
 * Updates the price in the repository
 * @param repository
 * @param fetchCurrencyPairPrice
 * @param currencyPair
 */
const refreshCurrencyPairPrice = async ({repository, fetchCurrencyPairPriceService, currencyPair} : {
  repository: Repository,
  fetchCurrencyPairPriceService: FetchCurrencyPairPriceService
  currencyPair: string
}) => {
 const {amount} = await fetchCurrencyPairPriceService(currencyPair);

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