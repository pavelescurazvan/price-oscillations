import {GetPriceHistory, Repository} from "../domain";


/**
 * Get price history
 */
export const createGetPriceHistory = (repository: Repository): GetPriceHistory => async ({currencyPair, numberOfDays}: {
  currencyPair: string,
  numberOfDays: number
}) => {

  return await repository.getPriceHistory({currencyPair, numberOfDays});
}
