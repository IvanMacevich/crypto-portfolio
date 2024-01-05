export interface TickInfoList {
	data: TickData;
}

export interface TickData {
	BTCPrice: number;
	list: Array<TickInfo>;
}
export interface TicksUserData {
	list: Array<TickInfo>;
}
export interface TickInfo {
	tick: string;
	buyingPrice?: number;
	amount?: number;
	curPrice: number;
	changePrice: number;
	btcVolume: number;
}
