import { Root } from "react-dom/client";
import { RootState } from "../../../../store/store";

export const selectCoinInfo = (state: RootState) => state.coinInfo.data.list;
export const selectBtcPrice = (state: RootState) => state.coinInfo.data.BTCPrice;