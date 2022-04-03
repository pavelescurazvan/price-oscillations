import express from "express";
import * as bodyParser from "body-parser";
import {Server} from "http";
import {createSampleRequestHandler} from "./controller";

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
  const transactionRequestHandler = createSampleRequestHandler({
    dependencyOne,
  });

  router.get('/currencies', transactionRequestHandler);
  router.get('/tickers/:currency', transactionRequestHandler);
  router.get('/ticker/:currencyPair', transactionRequestHandler);

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