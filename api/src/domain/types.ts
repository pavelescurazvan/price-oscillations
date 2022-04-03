import {Repository} from "./repository";


export type Price = {
  currency_pair: string,
  date: Date,
  price: string,
}

export type AddPrice = ({ price }: {
  price: Price,
}) => Promise<void>

export type CreateAddPrice = ({ repository }: {
  repository: Repository
}) => {
  addPrice: AddPrice
}

export type GetPriceHistory = ({ price }: {
  price: Price,
  days: number
}) => Promise<Price[]>

export type CreateGetPriceHistory = ({ repository }: {
  repository: Repository
}) => {
  getPriceHistory: GetPriceHistory
}