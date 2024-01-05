import { BaseState } from "../../../types/base-state.type";
import { TicksUserData } from "../../../types/ticks-user.type";

export interface TicksUserState extends BaseState {
  data: TicksUserData;
}
