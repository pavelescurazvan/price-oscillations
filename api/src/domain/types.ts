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
