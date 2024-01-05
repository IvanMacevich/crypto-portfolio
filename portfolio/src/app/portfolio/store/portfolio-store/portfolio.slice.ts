import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../../../types/base-state.type";
import { PortfolioState } from "../../types/portfolio-state";
import { COINS } from "../../constants/actions.constants";
import { fetchCoin, fetchCoins } from "./portfolio.actions";
import { TickData } from "../../../../types/tick-info.type";

const initialState: PortfolioState = {
	detail: [],
	total: 0,
	BTCPrice: 0,
	ticksForUserData: [],
	ticksData: { list: [], BTCPrice: 0 },
	status: StateStatus.INIT,
	error: null
};

const portfolioSlice = createSlice({
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
			}
		);
		builder.addCase(fetchCoins.rejected, (state, action) => {
			state.status = StateStatus.ERROR;
			state.error = action.payload;
		});
		builder.addCase(fetchCoin.pending, (state) => {
			state.status = StateStatus.LOADING;
			state.error = null;
		});
		builder.addCase(
			fetchCoin.fulfilled,
			(state, action: PayloadAction<TickData>) => {
				state.BTCPrice = action.payload.BTCPrice;
				state.detail = action.payload.list;
				state.status = StateStatus.SUCCESS;
			}
		);
		builder.addCase(fetchCoin.rejected, (state, action) => {
			state.status = StateStatus.ERROR;
			state.error = action.payload;
		});
	}
});

export const { reducer: portfolioReducer } = portfolioSlice;
