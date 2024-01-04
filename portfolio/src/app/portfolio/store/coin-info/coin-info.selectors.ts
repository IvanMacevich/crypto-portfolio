import { RootState } from "../../../../store/store";

export const selectCoinInfo = (state: RootState) => state.coinInfo.data.list;
<<<<<<< HEAD
export const selectBtcPrice = (state: RootState) =>
  state.coinInfo.data.BTCPrice;
export const selectCoinStatus = (state: RootState) => state.coinInfo.status;
=======
>>>>>>> 6ff3d02fcf3a19e5c0d2cb9446f7e3adca26fec2
