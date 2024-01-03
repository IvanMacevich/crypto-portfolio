import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { coinsListReducer } from "../app/portfolio/store/coins-list/portfolio.slice";
import { coinInfoReducer } from "../app/portfolio/store/coin-info/coin-info.slice";

export const store = configureStore({
	reducer: {
		coins: coinsListReducer,
		coinInfo: coinInfoReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
