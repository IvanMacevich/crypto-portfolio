export interface TickList {
    code: number;
    msg: string;
    data: TickData;
}

interface TickData {
    height: number;
    total: number;
    start: number;
    detail: Array<string>;
}