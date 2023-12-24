import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import usersReducer from "./users/usersSlice";

export const reduxStore = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

/* Types */
export type ReduxState = ReturnType<typeof reduxStore.getState>;
