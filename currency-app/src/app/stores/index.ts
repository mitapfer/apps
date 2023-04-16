import { createAsyncStore } from "@api/stateManager";
import { convertCurrencies, getCurrencySymbols, getLatestCourses } from "@api/resources";
import { XHRState } from "../../constructors";
import {
  FetchDataModel,
  IConvertCurrenciesModel,
  ICurrencySymbolsModel,
  ILatestCoursesModel
} from "@api/models";

type ConvertCurrenciesType = FetchDataModel<IConvertCurrenciesModel | null>;
export const $convertCurrencies = createAsyncStore<ConvertCurrenciesType>(
  convertCurrencies,
  new XHRState(null),
);

type LatestCoursesType = FetchDataModel<ILatestCoursesModel | null>;
export const $latestCourses = createAsyncStore<LatestCoursesType>(
  getLatestCourses,
  new XHRState(null),
);

type CurrencySymbolsType = FetchDataModel<ICurrencySymbolsModel | null>;
export const $currencySymbols = createAsyncStore<CurrencySymbolsType>(
  getCurrencySymbols,
  new XHRState(null),
);