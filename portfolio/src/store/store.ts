import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cryptoTableReducer } from "../app/portfolio/store/crypto-table/crypto-table.slice";
import { portfolioReducer } from "../app/portfolio/store/portfolio-store/portfolio.slice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    cryptoTable: cryptoTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
