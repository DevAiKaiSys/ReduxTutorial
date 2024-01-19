import {
  StoreEnhancer,
  applyMiddleware,
  compose,
  createStore,
  Store,
} from "redux";
import rootReducer from "./reducer";
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from "./exampleAddons/enhancers";
import { print1, print2, print3 } from "./exampleAddons/middleware";

let preloadedState;
// const persistedTodosString = localStorage!.getItem("todos"); // Error: localStorage is not defined

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString),
//   };
// }

// const store = createStore(rootReducer, preloadedState);
// const store = createStore(rootReducer, undefined, sayHiOnDispatch);
// const composedEnhancer: any = compose(sayHiOnDispatch, includeMeaningOfLife);

// const store = createStore(rootReducer, undefined, composedEnhancer);
const middlewareEnhancer: StoreEnhancer = applyMiddleware(
  print1,
  print2,
  print3
);

// Pass enhancer as the second arg, since there's no preloadedState
const store: Store = createStore(rootReducer, middlewareEnhancer);

export default store;

/* Types */
export type AppStore = ReturnType<typeof createStore>;
