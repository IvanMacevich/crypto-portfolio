import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../../../types/base-state.type";
import { COINS } from "../../constants/actions.constants";
import { CoinInfoState } from "../../types/coin-info-state.type";
import { TickInfoList } from "./../../../../types/tick-info.type";
import { fetchCoinInfo } from "./coin-info.actions";

const initialState: CoinInfoState = {
  data: { BTCPrice: 0, list: [] },
  status: StateStatus.INIT,
  error: null,
};

const coinInfoSlice = createSlice({
  name: COINS.ACTIONS.FETCH_COIN_INFO,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinInfo.pending, (state) => {
      state.status = StateStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchCoinInfo.fulfilled,
      (state, action: PayloadAction<TickInfoList>) => {
        state.status = StateStatus.SUCCESS;
        console.log(action.payload);
        state.data = {
          list: action.payload.data.list,
          BTCPrice: action.payload.data.BTCPrice,
        };
        console.log(state.data);
      }
    );
    builder.addCase(fetchCoinInfo.rejected, (state, action) => {
      state.status = StateStatus.ERROR;
      state.error = action.payload;
    });
  },
});

export const { reducer: coinInfoReducer } = coinInfoSlice;
