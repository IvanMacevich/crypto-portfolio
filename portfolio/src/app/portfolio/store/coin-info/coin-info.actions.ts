import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../config/api/axios.instance";
import { TickInfoList } from "../../../../types/tick-info.type";

export const fetchCoinInfo = createAsyncThunk<
  TickInfoList,
  { timeType: string; ticks: string[] },
  { rejectValue: string }
>("coins/fetchCoinInfo", async ({ timeType, ticks }, { rejectWithValue }) => {
  try {
    const response = await instance.post<TickInfoList>(
      "/v3/market/brc20/auction/brc20_types",
      {
        timeType: timeType,
        ticks: ticks,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data || [];
    } else {
      console.error("Failed to fetch coin info");
      return rejectWithValue("Failed to fetch coin info");
    }
  } catch (error) {
    console.error("Error while fetching coin info:", error);
    return rejectWithValue("Error while fetching coin info");
  }
});
