import {Repository} from "./repository";


export type Price = {
  currencyPair: string,
  amount: string,
}

export type AddPrice = (price: Price) => Promise<void>
export type GetLastPrice = (currencyPair: string) => Promise<{
  amount: string,
  currency_pair: string,
  date: Date
}>

export type GetPriceHistory = ({currencyPair, periodInMS}: {
  currencyPair: string,
  periodInMS: number
}) => Promise<Price[]>

export type CreateAddPrice = ({ repository }: {
  repository: Repository
}) => {
  addPrice: AddPrice
}

export type CreateGetPriceHistory = ({ repository }: {
  repository: Repository
}) => {
  getPriceHistory: GetPriceHistory
}