import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../config/api/axios.instance";
import { getTicksByUserId } from "../../../../config/firebase/firebase-config";
import { TickInfoList } from "../../../../types/tick-info.type";
import { TickUser } from "../../../../types/ticks-user.type";

export const fetchUserCoins = createAsyncThunk<
  TickUser[],
  { timeType: string },
  { rejectValue: string }
>("coins/fetchUserCoins", async ({ timeType }, { rejectWithValue }) => {
  try {
    const ticksData = await getTicksByUserId("f0gc5oHPjgT0vJJSq03P");
    const tickNames = ticksData?.map((ticksData) => ticksData.tick);

    console.log(tickNames);
    const response = await instance.post<TickInfoList>(
      "/v3/market/brc20/auction/brc20_types",
      {
        timeType: timeType,
        ticks: tickNames,
      }
    );

    if (response.status === 200) {
      const combinedData: TickUser[] | undefined = ticksData?.map((ticks) => {
        console.log(ticks.tick);
        const dynamicData = response.data.data.list.find(
          (d) => d.tick === ticks.tick
        );
        if (dynamicData) {
          return {
            name: String(ticks.tick),
            buyingPrice: Number(ticks.buyingPrice),
            curPrice: dynamicData.curPrice,
            changePrice: dynamicData.changePrice,
          };
        }
        return {
          name: String(ticks.tick),
          buyingPrice: Number(ticks.buyingPrice),
          curPrice: 0,
          changePrice: 0,
        };
      });
      console.log(combinedData);
      return combinedData!;
    } else {
      console.error("Failed to fetch coin info");
      return rejectWithValue("Failed to fetch coin info");
    }
  } catch (error) {
    console.error("Error while fetching coin info:", error);
    return rejectWithValue("Error while fetching coin info");
  }
});
