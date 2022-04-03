import {RequestHandler} from "express";
import {AddPrice, GetPriceHistory} from "../domain";
import axios from "axios";
import {config} from "../config";

/**
 * Creates the transaction request handler
 * @param repository
 */
export const createGetCurrencyPairTickerRequestHandler = ({ addPrice, getPriceHistory }: {
  addPrice: AddPrice,
  getPriceHistory: GetPriceHistory
}): RequestHandler  => {

  return async (req, res) => {
    const currencyPair = req.params.pair;


    const response = await axios.get(`${config.upholdAPIURL}/ticker/${currencyPair}`);
    const {ask: amount} = response.data;

    await addPrice({amount, currencyPair});

    const records = await getPriceHistory({currencyPair, numberOfDays: config.numberOfDays});

    res.send(records);
  }
}
