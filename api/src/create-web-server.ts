import * as express from "express";
import * as bodyParser from "body-parser";
import {Server} from "http";
import {createListCurrenciesRequestHandler} from "./controller";
import {createListCurrencyTickersRequestHandler} from "./controller";
import {createGetCurrencyPairTickerRequestHandler} from "./controller";


/**
 * Creates the web server.
 */
export const createWebServer = () => {
  const port = 8080;

  const app = express();

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const router = express.Router();

  app.use("/", router);


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

  router.get('/currencies', listCurrenciesRequestHandler);
  router.get('/currency-tickers/:currency', listCurrencyTickersRequestHandler);
  router.get('/currency-pair-ticker', getCurrencyPairTickerRequestHandler);

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