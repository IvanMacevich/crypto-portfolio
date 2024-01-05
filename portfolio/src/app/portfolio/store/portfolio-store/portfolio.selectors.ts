import { RootState } from "../../../../store/store";

export const selectCoinsList = (state: RootState) => state.portfolio.detail;
export const selectBtcPrice = (state: RootState) => state.portfolio.BTCPrice;
export const selectStatus = (state: RootState) => state.portfolio.status;