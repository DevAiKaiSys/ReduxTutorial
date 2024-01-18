"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/redux/store";
import { fetchUsers } from "./redux/slices/usersSlice/usersSlice";

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
    storeRef.current.dispatch(fetchUsers());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
