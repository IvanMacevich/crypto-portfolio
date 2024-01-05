export interface TickUser {
  name: string;
  buyingPrice: number;
  curPrice: number;
  changePrice: number;
}

export interface TicksUserData {
  list: Array<TickUser>;
}
