import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import { thunk } from "redux-thunk";

const composedEnhancer: any = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  // applyMiddleware()
  // applyMiddleware(thunkMiddleware)
  applyMiddleware(thunk)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

export default store;

/* Types */
export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
