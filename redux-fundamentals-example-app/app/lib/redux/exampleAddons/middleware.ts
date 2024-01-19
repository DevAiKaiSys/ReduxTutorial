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
