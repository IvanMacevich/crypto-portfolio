import { RootState } from "../../../../store/store";

export const selectCoinsList = (state: RootState) => state.coins.detail;