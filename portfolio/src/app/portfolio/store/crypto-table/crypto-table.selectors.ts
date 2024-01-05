import { RootState } from "../../../../store/store";

export const selectUserTicks = (state: RootState) => state.cryptoTable.data;
export const selectUserTickStatus = (state: RootState) =>
  state.cryptoTable.status;
