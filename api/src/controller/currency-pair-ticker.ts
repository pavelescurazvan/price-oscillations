import {RequestHandler} from "express";
import {GetPriceHistory} from "../domain";
import {config} from "../config";

/**
 * Creates the transaction request handler
 * @param repository
 */
export const createGetCurrencyPairTickerRequestHandler = ({ getPriceHistory }: {
  getPriceHistory: GetPriceHistory
}): RequestHandler  => {

  return async (req, res) => {
    const currencyPair = req.params.pair;
    const periodInMS = Number(req.params.period);

    const records = await getPriceHistory({
      periodInMS,
      currencyPair,
      numberOfDays: config.numberOfDays});

    res.send(records);
  }
}
