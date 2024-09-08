import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TestsSlice from "./reducers/TestsSlice";
import SearchStringSlice from "./reducers/SearchStringSlice";

export const store = configureStore({
  reducer: {
    tests: TestsSlice,
    searchString: SearchStringSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
