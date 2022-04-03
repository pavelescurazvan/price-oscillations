import {Repository} from "./repository";


export type Price = {
  currencyPair: string,
  amount: string,
}

export type AddPrice = (price: Price) => Promise<void>

export type CreateAddPrice = ({ repository }: {
  repository: Repository
}) => {
  addPrice: AddPrice
}

export type GetPriceHistory = (days: number) => Promise<Price[]>

export type CreateGetPriceHistory = ({ repository }: {
  repository: Repository
}) => {
  getPriceHistory: GetPriceHistory
}