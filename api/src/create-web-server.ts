import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import {Server} from "http";
import {createListCurrenciesRequestHandler} from "./controller";
import {createListCurrencyTickersRequestHandler} from "./controller";
import {createGetCurrencyPairTickerRequestHandler} from "./controller";
import {Transaction} from "./domain";
import {errorHandler} from "./middlewars/error-handler";
import {asyncWrapper} from "./middlewars/async-wrapper";
import {getConnectionPool} from "./db-utils";


/**
 * Creates the web server.
 */
export const createWebServer = () => {
  const port = 8080;

  const app = express();

  app.use(cors())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const router = express.Router();

  app.use("/", router);

  app.use(errorHandler);

  // Initialise database.
  // @ts-ignore
  const pool = getConnectionPool();

  const {dependencyOne} = {
    dependencyOne: ({ transaction }: {
      transaction: Transaction,
    }) => {
      console.log(transaction);

      return Promise.resolve({
        data: 1,
      })
    }
  };

  // Request handlers
  const listCurrenciesRequestHandler = createListCurrenciesRequestHandler({
    dependencyOne,
  });

  const listCurrencyTickersRequestHandler = createListCurrencyTickersRequestHandler({
    dependencyOne,
  });

  const getCurrencyPairTickerRequestHandler = createGetCurrencyPairTickerRequestHandler({
    dependencyOne,
  });


  router.get('/currencies',   asyncWrapper(listCurrenciesRequestHandler));
  router.get('/currency-tickers:currency', asyncWrapper(listCurrencyTickersRequestHandler));
  router.get('/currency-pair-ticker/:pair', asyncWrapper(getCurrencyPairTickerRequestHandler));

  let server: Server;
  return {
    start: () => {
      server = app.listen(port,() => {
        console.log(`API running on port: ${port}`)
      })
    },
    stop: () => {
      server.close();
    },
    uri: `http://localhost:${port}`
  }
}