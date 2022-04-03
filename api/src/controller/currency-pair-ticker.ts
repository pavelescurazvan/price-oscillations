import {RequestHandler} from "express";
import {DependencyOne} from "../domain";
import axios from "axios";
import {config} from "../config";

/**
 * Creates the transaction request handler
 * @param repository
 */
// @ts-ignore
export const createGetCurrencyPairTickerRequestHandler = ({ dependencyOne }: {
  dependencyOne: DependencyOne
}): RequestHandler  => {

  return async (req, res) => {
    const currencyPair = req.params.pair;

    const response = await axios.get(`${config.upholdAPIURL}/ticker/${currencyPair}`);
    const {ask: price} = response.data;

    const record = {price, date: new Date().toUTCString(), currencyPair};

    res.send([record]);
  }
}
