import { httpGet } from "../client";

const BASE_URL = "https://api.apilayer.com/fixer";

export const convertCurrencies = (params: any) => {
  return httpGet(`${BASE_URL}/convert`, { params });
};

export const getLatestCourses = (params: any) => {
  return httpGet(`${BASE_URL}/latest`, { params });
};

export const getCurrencySymbols = () => {
  return httpGet(`${BASE_URL}/symbols`);
};