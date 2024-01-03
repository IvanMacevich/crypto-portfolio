import { createAsyncThunk } from "@reduxjs/toolkit";
import { TickList } from "../../../../types/tick-list.type";
import { instance } from "../../../../config/api/axios.instance";
import { COINS } from "../../constants/actions.constants";

export const fetchCoins = createAsyncThunk<
	TickList, 
	{ page: number; limit: number },
	{ rejectValue: string }
>("coins/fetchCoins", async ({ page, limit }, { rejectWithValue }) => {
	try {
		const response = await instance.get<TickList>(
			"/v1/indexer/brc20/list", // Уже указан baseURL в instance, поэтому просто добавляем оставшуюся часть URL
			{
				params: {
					start: (page - 1) * limit,
					limit: limit
				}
			}
		);

		if (response.status === 200) {
			return response.data || [];
		} else {
			console.error("Failed to fetch coins");
			return rejectWithValue("Failed to fetch coins");
		}
	} catch (error) {
		console.error("Error while fetching coins:", error);
		return rejectWithValue("Error while fetching coins");
	}
});

