import { configureStore } from "@reduxjs/toolkit";
import searchInputReducer from "./reducers/searchInputReducer";

export const store = configureStore({
  reducer: {
    search: searchInputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
