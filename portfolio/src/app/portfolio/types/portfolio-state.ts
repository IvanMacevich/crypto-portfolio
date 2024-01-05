import { BaseState } from "../../../types/base-state.type";
import { TickData, TickInfo } from "../../../types/tick-info.type";

export interface PortfolioState extends BaseState{
    detail: Array<TickInfo>,
    total:number,
    BTCPrice: number,
    ticksForUserData: Array<TickInfo>;
    ticksData: TickData,
}