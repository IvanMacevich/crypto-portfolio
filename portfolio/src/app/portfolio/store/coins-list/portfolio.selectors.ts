import { RootState } from "../../../../store/store";

export const selectCoinsList = (state: RootState) => state.coins.detail;
export const selectBtcPrice = (state: RootState) => state.coins.BTCPrice;
export const selectStatus = (state: RootState) => state.coins.status;