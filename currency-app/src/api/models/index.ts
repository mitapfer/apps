export type ErrorResponse = {
  title: string;
  status: number;
};

export type FetchDataModel<D> = {
  loading: boolean;
  data: D;
  error?: ErrorResponse;
};

export interface IErrorModel {
  "code": number;
  "info": string;
}

export interface IConvertCurrenciesModel {
  "success": boolean;
  "query": {
    "from": string;
    "to": string;
    "amount": number;
  },
  "info": {
    "timestamp": number;
    "rate": number;
  },
  "historical": string;
  "date": string;
  "result": number;
  "error": IErrorModel,
}

export interface ILatestCoursesModel {
  "success": boolean;
  "timestamp": number;
  "base": string;
  "date": string;
  "rates": {
    [name: string]: number;
  };
  "error": IErrorModel,
}

export interface ICurrencySymbolsModel {
  "success": boolean;
  "symbols": {
    [name: string]: number;
  };
  "error": IErrorModel,
}