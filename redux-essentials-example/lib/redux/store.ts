import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";

export const reduxStore = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
