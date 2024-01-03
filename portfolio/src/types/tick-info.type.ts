export interface TickInfoList {
	data: TickData;
}

export interface TickData {
	BTCPrice: number;
	list: Array<TickInfo>;
}
interface TickInfo {
	tick: string;
	curPrice: number;
	btcVolume: number;
	changePrice: number;
}
