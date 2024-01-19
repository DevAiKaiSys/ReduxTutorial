import { Middleware } from "redux";

export const print1: Middleware = (storeAPI) => (next) => (action) => {
  console.log("1");
  return next(action);
};

export const print2: Middleware = (storeAPI) => (next) => (action) => {
  console.log("2");
  return next(action);
};

export const print3: Middleware = (storeAPI) => (next) => (action) => {
  console.log("3");
  return next(action);
};

// function exampleMiddleware(storeAPI) {
const exampleMiddleware: Middleware = (storeAPI) => {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action);
    };
  };
};

const anotherExampleMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    // Do something in here, when each action is dispatched

    return next(action);
  };

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", storeAPI.getState());
  return result;
};
