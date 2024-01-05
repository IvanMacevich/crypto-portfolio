import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { coinInfoReducer } from "../app/portfolio/store/coin-info/coin-info.slice";
import { coinsListReducer } from "../app/portfolio/store/coins-list/portfolio.slice";
import { cryptoTableReducer } from "../app/portfolio/store/crypto-table/crypto-table.slice";

export const store = configureStore({
  reducer: {
    coins: coinsListReducer,
    coinInfo: coinInfoReducer,
    cryptoTable: cryptoTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
