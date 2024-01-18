import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./slices/postsSlice/postsSlice";
import usersReducer from "./slices/usersSlice/usersSlice";
import notificationsReducer from "./slices/notificationsSlice/notificationsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      users: usersReducer,
      notifications: notificationsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
