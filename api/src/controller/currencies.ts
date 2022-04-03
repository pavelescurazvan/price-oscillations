import {RequestHandler} from "express";

/**
 * Creates the transaction request handler
 */
export const createListCurrenciesRequestHandler = (): RequestHandler  => {

  return async (_req, res) => {
    res.send({});
  }

}
