import { AxiosResponse, AxiosError } from "axios";
import { createEffect, createEvent, createStore, Event, Store } from "effector";

type startReducerType<S, P> = (state: S, params: P) => S;
type doneReducerType<S, P, D> = (state: S, response: { params: P; result: AxiosResponse<D> }) => S;
type failReducerType<S, P> = (state: S, payload: { params: P; error: AxiosError<any> }) => S;
type ResetType = Event<void>;

const startReducerDefault = (state: any) => ({ ...state, loading: true });
const doneReducerDefault = (state: any, response: any) => ({ ...state, loading: false, data: response.result.data });
const failReducerDefault = (state: any, { error }) => ({ ...state, loading: false, error: error.response && error.response.data });

type HandlerType<P, D> = (params: P) => Promise<AxiosResponse<D>>;
type ReducersType<S, P, D> = {
  startReducer?: false | startReducerType<S, P>;
  doneReducer?: false | doneReducerType<S, P, D>;
  failReducer?: false | failReducerType<S, P>;
};

export const createAsyncStore = <S, P = any, D = any>(
    handler: HandlerType<P, D>,
    initialState: any,
    reducers: ReducersType<S, P, D> = {},
    resets?: ResetType,
  ) => {
  const startReducer = reducers.startReducer || startReducerDefault;
  const doneReducer = reducers.doneReducer || doneReducerDefault;
  const failReducer = reducers.failReducer || failReducerDefault;

  const effect = createEffect<HandlerType<P, D>>(handler);
  const reset = createEvent();
  const store: Store<S> = createStore(initialState).reset(reset);

  if (startReducer) {
    store.on(effect, startReducer);
  }

  if (doneReducer) {
    store.on(effect.done, doneReducer);
  }

  if (failReducer) {
    store.on(effect.fail, failReducer);
  }

  if (resets) {
    store.reset(resets);
  }

  return {
    effect,
    store,
    reset,
  };
};
