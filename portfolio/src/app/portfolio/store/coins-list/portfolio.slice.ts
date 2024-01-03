import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../../../types/base-state.type";
import { CoinsState } from "../../types/coins-state.type";
import { fetchCoins } from "./portfolio.actions";
import { COINS } from "../../constants/actions.constants";
import { TickList } from "../../../../types/tick-list.type";

const initialState: CoinsState = {
	detail: [],
	total: 0,
	status: StateStatus.INIT,
	error: null
};

const coinsSlice = createSlice({
	name: COINS.DOMAIN,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoins.pending, state => {
			state.status = StateStatus.LOADING;
			state.error = null;
		});
        builder.addCase(fetchCoins.fulfilled, (state, action: PayloadAction<TickList>) => {
            state.status = StateStatus.SUCCESS;
            state.detail = action.payload.data.detail;
            state.total = action.payload.data.total;
        });
		builder.addCase(fetchCoins.rejected, (state, action) => {
			state.status = StateStatus.ERROR;
			state.error = action.payload;
		});
	}
});

export const { reducer: coinsListReducer } = coinsSlice;