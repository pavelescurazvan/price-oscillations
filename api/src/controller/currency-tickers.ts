import {RequestHandler} from "express";

/**
 * Creates the transaction request handler
 */
export const createListCurrencyTickersRequestHandler = (): RequestHandler  => {

  return async (_req, res) => {

    res.send({});
  }

}
