import {
  StoreEnhancer,
  applyMiddleware,
  compose,
  createStore,
  Store,
  Middleware,
  MiddlewareAPI,
  Dispatch,
} from "redux";
import rootReducer from "./reducer";
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from "./exampleAddons/enhancers";
import { print1, print2, print3 } from "./exampleAddons/middleware";
import { TodoAction } from "./todosSlice/todosSlice";

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
// const middlewareEnhancer: StoreEnhancer = applyMiddleware(
//   print1,
//   print2,
//   print3
// );

// // Pass enhancer as the second arg, since there's no preloadedState
// const store: Store = createStore(rootReducer, middlewareEnhancer);
const alwaysReturnHelloMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const originalResult = next(action);
    // Ignore the original result, return something else
    return "Hello!";
  };

const delayedMessageMiddleware: any =
  (storeAPI: MiddlewareAPI) =>
  (next: Dispatch<TodoAction>) =>
  (action: TodoAction) => {
    if (action.type === "todos/todoAdded") {
      setTimeout(() => {
        console.log("Added a new todo: ", action.payload);
      }, 1000);
    }

    return next(action);
  };

const middlewareEnhancer = applyMiddleware(
  alwaysReturnHelloMiddleware,
  delayedMessageMiddleware
);
const store = createStore(rootReducer, middlewareEnhancer);

const dispatchResult = store.dispatch({ type: "some/action" });
console.log(dispatchResult);
// log: 'Hello!'

export default store;

/* Types */
export type AppStore = ReturnType<typeof createStore>;
