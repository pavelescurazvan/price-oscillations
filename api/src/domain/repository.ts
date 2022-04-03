import {Transaction} from "./types";

export interface TransactionRecord extends Transaction {
  transactionsTurnover: number
}

export interface Repository {
  addPrice: (transaction: Transaction) => Promise<void>,
  getPriceHistory: (clientId: number, calendarMonth: string) => Promise<TransactionRecord>,
}
