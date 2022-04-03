import Axios from "axios";

const returnAxiosInstance = () => {
  return Axios.create();
}

export const get = (url: string) => {
  const axios = returnAxiosInstance();
  return axios.get(url);
}
