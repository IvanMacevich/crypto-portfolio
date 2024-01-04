import { createAsyncThunk } from "@reduxjs/toolkit";
import { TickList } from "../../../../types/tick-list.type";
import { instance } from "../../../../config/api/axios.instance";
import { COINS } from "../../constants/actions.constants";
import {
	TickData,
	TickInfo,
	TickInfoList
} from "../../../../types/tick-info.type";

export const fetchCoins = createAsyncThunk<
	TickData,
	{ page: number; limit: number },
	{ rejectValue: string }
>("coins/fetchCoins", async ({ page, limit }, { rejectWithValue }) => {
	try {
		const responseArray = await instance.get<TickList>(
			"/v1/indexer/brc20/list", // Уже указан baseURL в instance, поэтому просто добавляем оставшуюся часть URL
			{
				params: {
					start: (page - 1) * limit,
					limit: limit
				}
			}
		);
		const tickers = responseArray.data.data.detail;
		const responseInfo = await instance.post<TickInfoList>(
			"/v3/market/brc20/auction/brc20_types",
			{ timeType: "day1", ticks: responseArray.data.data.detail }
		);
		console.log(responseInfo.data);
		if (responseArray.status === 200) {
			const tickInfoMap: Record<string, TickInfo> = {};
			if (responseInfo.data && responseInfo.data.data) {
				responseInfo.data.data.list.forEach((tickInfo) => {
					tickInfoMap[tickInfo.tick] = tickInfo;
				});
			}
			const tickListWithDefaults = tickers.map((ticker) => ({
				...(tickInfoMap[ticker] || {
					tick: ticker,
					curPrice: 0,
					btcVolume: 0,
					changePrice: 0
				})
			}));
			return (
				{
					BTCPrice: responseInfo.data.data.BTCPrice,
					list: tickListWithDefaults
				} || []
			);
		} else {
			console.error("Failed to fetch coins");
			return rejectWithValue("Failed to fetch coins");
		}
	} catch (error) {
		console.error("Error while fetching coins:", error);
		return rejectWithValue("Error while fetching coins");
	}
});

export const fetchCoin = createAsyncThunk<
	TickData,
	{ timeType: string; tick: string },
	{ rejectValue: string }
>("coins/fetchCoin", async ({ timeType, tick }, { rejectWithValue }) => {
	try {
		const responseInfo = await instance.post<TickInfoList>(
			"/v3/market/brc20/auction/brc20_types",
			{ timeType, ticks: [tick] }
		);

		if (responseInfo.status === 200) {

			return {BTCPrice: responseInfo.data.data.BTCPrice, list: responseInfo.data.data.list} || [];
		} else {
			console.error("Failed to fetch coin info");
			return rejectWithValue("Failed to fetch coin info");
		}
	} catch (error) {
		console.error("Error while fetching coin info:", error);
		return rejectWithValue("Error while fetching coin info");
	}
});
