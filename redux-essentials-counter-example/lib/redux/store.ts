import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { incrementAsync } from "./slices/counterSlice";

export const reduxStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

/* Types */
export type ReduxState = ReturnType<typeof reduxStore.getState>;
