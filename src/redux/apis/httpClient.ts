import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.stackexchange.com/2.3/",
});
