import { BaseState } from "../../../types/base-state.type";
import { TickInfo } from "../../../types/tick-info.type";

export interface CoinsState extends BaseState {
    detail: Array<TickInfo>,
    total:number,
    BTCPrice: number,
}