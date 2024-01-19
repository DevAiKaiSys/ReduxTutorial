import { PayloadAction } from "@reduxjs/toolkit";
import { StoreEnhancer, Reducer } from "redux";

export const sayHiOnDispatch: any = (createStore: any) => {
  return (
    rootReducer: Reducer,
    preloadedState?: any | undefined,
    enhancers?: StoreEnhancer<{}, {}>[]
  ) => {
    const store = createStore(rootReducer, preloadedState, enhancers);

    function newDispatch(action: PayloadAction) {
      const result = store.dispatch(action);
      console.log("Hi!");
      return result;
    }

    return { ...store, dispatch: newDispatch };
  };
};

export const includeMeaningOfLife: any = (createStore: any) => {
  return (
    rootReducer: Reducer,
    preloadedState?: any | undefined,
    enhancers?: StoreEnhancer<{}, {}>[]
  ) => {
    const store = createStore(rootReducer, preloadedState, enhancers);

    function newGetState() {
      return {
        ...store.getState(),
        meaningOfLife: 42,
      };
    }

    return { ...store, getState: newGetState };
  };
};
