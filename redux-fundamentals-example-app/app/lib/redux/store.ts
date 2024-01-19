import { compose, createStore } from "redux";
import rootReducer from "./reducer";
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from "./exampleAddons/enhancers";

let preloadedState;
// const persistedTodosString = localStorage!.getItem("todos"); // Error: localStorage is not defined

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString),
//   };
// }

// const store = createStore(rootReducer, preloadedState);
// const store = createStore(rootReducer, undefined, sayHiOnDispatch);
const composedEnhancer: any = compose(sayHiOnDispatch, includeMeaningOfLife);

const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;

/* Types */
export type AppStore = ReturnType<typeof createStore>;
