import {Transaction} from "./types";

export interface TransactionRecord extends Transaction {
  transactionsTurnover: number
}

export interface Repository {
  putTransaction: (transaction: Transaction) => Promise<void>,
  getLastTransaction: (clientId: number, calendarMonth: string) => Promise<TransactionRecord>,
}
