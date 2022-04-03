import {AddPrice, GetPriceHistory} from "./types";


export interface Repository {
  addPrice: AddPrice,
  getPriceHistory: GetPriceHistory,
}
