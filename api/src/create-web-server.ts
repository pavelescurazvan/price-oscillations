import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import {Server} from "http";
import {createListCurrenciesRequestHandler} from "./controller";
import {createListCurrencyTickersRequestHandler} from "./controller";
import {createGetCurrencyPairTickerRequestHandler} from "./controller";
import {errorHandler} from "./middlewars/error-handler";
import {asyncWrapper} from "./middlewars/async-wrapper";
import {getConnectionPool} from "./db-utils";
import {createPostgresRepository} from "./repositories/postgres-repository";
import {createAddPrice, createGetPriceHistory} from "./domain";


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
  const pool = getConnectionPool();

  const repository = createPostgresRepository(pool);

  // Domain
  const addPrice = createAddPrice(repository);
  const getPriceHistory = createGetPriceHistory(repository);

  // Request handlers
  const listCurrenciesRequestHandler = createListCurrenciesRequestHandler();
  const listCurrencyTickersRequestHandler = createListCurrencyTickersRequestHandler();
  const getCurrencyPairTickerRequestHandler = createGetCurrencyPairTickerRequestHandler({
    addPrice,
    getPriceHistory
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