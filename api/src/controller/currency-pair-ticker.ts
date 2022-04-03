import {RequestHandler} from "express";
import {DependencyOne} from "../domain";

/**
 * Creates the transaction request handler
 * @param repository
 */
export const createGetCurrencyPairTickerRequestHandler = ({ dependencyOne }: {
  dependencyOne: DependencyOne
}): RequestHandler  => {

  return async (req, res) => {
    const {data} = req.body;


    res.send({});
  }

}
