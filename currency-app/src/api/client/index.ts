import axios from "axios";

const ACCESS_KEY = "G1bhz28xjDoXAgx12pLQpbfQHizmeqNc";

const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  config.headers = Object.assign(config.headers, { "apiKey": ACCESS_KEY });
  return config;
});

export const httpGet = (url, config = {}) => httpClient({
  method: "get",
  url,
  ...config
});