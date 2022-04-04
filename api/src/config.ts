import 'dotenv/config';

// Load the environment variables.
const rawEnv = process.env;

// What port the Node service will listen on.
const port = rawEnv.PORT ? Number(rawEnv.PORT) : '8080';

export const config = {
  port,

  dbHost: rawEnv.DB_HOST ?? 'localhost',
  dbName: rawEnv.DB_NAME ?? 'tickers',
  dbUser: rawEnv.DB_USER ?? 'postgres',
  dbPassword: rawEnv.DB_PASSWORD ?? 'postgres',
  dbPort: rawEnv.DB_PORT ? Number(rawEnv.DB_PORT) : 5432,

  upholdAPIURL: 'https://api.uphold.com/v0'
};
