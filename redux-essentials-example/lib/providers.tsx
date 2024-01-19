"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/redux/store";
import { apiSlice } from "./redux/api/apiSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // Initialize
    // storeRef.current.dispatch(fetchUsers());
    storeRef.current.dispatch(apiSlice.endpoints.getUsers.initiate());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
