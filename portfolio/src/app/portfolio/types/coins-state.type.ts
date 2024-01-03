import { BaseState } from "../../../types/base-state.type";

export interface CoinsState extends BaseState {
    detail: Array<string>,
    total:number
}