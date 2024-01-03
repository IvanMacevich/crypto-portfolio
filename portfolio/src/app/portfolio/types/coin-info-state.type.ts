import { BaseState } from "../../../types/base-state.type";
import { TickData } from "../../../types/tick-info.type";

export interface CoinInfoState extends BaseState {
    data: TickData,
}


