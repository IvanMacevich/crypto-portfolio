import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../../../types/base-state.type";
import { CoinsState } from "../../types/coins-state.type";
import { fetchCoin, fetchCoins } from "./portfolio.actions";
import { COINS } from "../../constants/actions.constants";
import { TickData, TickInfo } from "../../../../types/tick-info.type";
import { TickList } from "../../../../types/tick-list.type";

const initialState: CoinsState = {
	detail: [],
	total: 0,
	status: StateStatus.INIT,
	error: null,
	BTCPrice: 0,
};

const coinsSlice = createSlice({
	name: COINS.DOMAIN,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoins.pending, (state) => {
			state.status = StateStatus.LOADING;
			state.error = null;
		});
		builder.addCase(
			fetchCoins.fulfilled,
			(state, action: PayloadAction<TickData>) => {
				state.status = StateStatus.SUCCESS;
				state.BTCPrice = action.payload.BTCPrice;
				state.detail = action.payload.list;
				// state.detail = [...state.detail, ...action.payload.list]
			}
		);
		builder.addCase(fetchCoins.rejected, (state, action) => {
			state.status = StateStatus.ERROR;
			state.error = action.payload;
		});
		builder.addCase(fetchCoin.pending, (state)=>{
			state.status = StateStatus.LOADING;
			state.error = null;
		})
		builder.addCase(fetchCoin.fulfilled, (state, action: PayloadAction<TickData>)=>{
			state.BTCPrice = action.payload.BTCPrice;
			state.detail = action.payload.list;
			state.status = StateStatus.SUCCESS;
		})
		builder.addCase(fetchCoin.rejected, (state, action)=>{
			state.status = StateStatus.ERROR;
			state.error = action.payload;
		})
	}
});

export const { reducer: coinsListReducer } = coinsSlice;
