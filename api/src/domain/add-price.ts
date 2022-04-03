import {AddPrice, Repository} from "../domain";


/**
 * Add a price
 */
export const createAddPrice = (repository: Repository): AddPrice => async ({amount, currencyPair}) => {
  await repository.addPrice({amount, currencyPair});
}