import {AddPrice, GetLastPrice, GetPriceHistory} from "./types";


export interface Repository {
  addPrice: AddPrice,
  getPriceHistory: GetPriceHistory,
  getLastPrice: GetLastPrice,
}
