import {Pool} from "pg";
import {Repository} from "../domain";
import {query} from "../db-utils";
import {Price} from "../domain/types";


/**
 * Creates a Postgres Repository
 */
export const createPostgresRepository = (pool: Pool): Repository => {
  return {
    addPrice: async ({amount, currencyPair}) => {
      await query(pool, "INSERT INTO tickers.entries(amount, currency_pair)", [amount, currencyPair])
    },

    getPriceHistory: async (_days) => {
      const {rows} = await query(pool, "SELECT *  FROM tickers.entries") as {
        rows: Price[];
      };

      return rows;
    }
  }
}