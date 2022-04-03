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
      await query(pool, "INSERT INTO tickers.entries(amount, currency_pair) VALUES($1, $2)", [amount, currencyPair])
    },

    getPriceHistory: async ({currencyPair, numberOfDays}) => {
      const {rows} = await query(pool,
        `SELECT *  FROM tickers.entries
        WHERE currency_pair = '${currencyPair}'
        AND date > (CURRENT_DATE - INTERVAL '${numberOfDays} days')`
      ) as {
        rows: Price[];
      };

      return rows;
    }
  }
}