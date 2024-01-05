import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../../../types/base-state.type";
import { TickUser } from "../../../../types/ticks-user.type";
import { COINS } from "../../constants/actions.constants";
import { TicksUserState } from "../../types/coin-user-state.type";
import { fetchUserCoins } from "./crypto-table.actions";

const initialState: TicksUserState = {
  data: { list: [] },
  status: StateStatus.INIT,
  error: null,
};

const cryptoTableSlice = createSlice({
  name: COINS.ACTIONS.FETCH_COIN_INFO,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCoins.pending, (state) => {
      state.status = StateStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchUserCoins.fulfilled,
      (state, action: PayloadAction<TickUser[]>) => {
        state.status = StateStatus.SUCCESS;
        console.log(action.payload);
        state.data = {
          list: action.payload,
        };
        console.log(state.data);
      }
    );
    builder.addCase(fetchUserCoins.rejected, (state, action) => {
      state.status = StateStatus.ERROR;
      state.error = action.payload;
    });
  },
});

export const { reducer: cryptoTableReducer } = cryptoTableSlice;
