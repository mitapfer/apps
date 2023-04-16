import { ErrorResponse, FetchDataModel } from "@api/models";

export class XHRState<D> implements FetchDataModel<D> {
  loading: boolean;
  data: D;
  error?: ErrorResponse;

  constructor(data: D) {
    this.loading = false;
    this.data = data;
    this.error = undefined;
  }
}