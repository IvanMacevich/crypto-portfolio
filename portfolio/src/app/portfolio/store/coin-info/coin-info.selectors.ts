import { RootState } from "../../../../store/store";

export const selectCoinInfo = (state: RootState) => state.coinInfo.data.list;
export const selectBtcPrice = (state: RootState) =>
  state.coinInfo.data.BTCPrice;
export const selectCoinStatus = (state: RootState) => state.coinInfo.status;
