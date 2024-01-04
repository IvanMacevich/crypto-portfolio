import { useCallback } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../../store/store";
import { StateStatus } from "../../../types/base-state.type";
import { fetchCoinInfo } from "../store/coin-info/coin-info.actions";
import {
  selectCoinInfo,
  selectCoinStatus,
} from "../store/coin-info/coin-info.selectors";

export const useTicks = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectCoinInfo);
  const status = useSelector(selectCoinStatus);

  const fetch = useCallback(
    (tickNames: string[]) => {
      console.log(tickNames);
      if (status !== StateStatus.LOADING)
        dispatch(fetchCoinInfo({ timeType: "day1", ticks: tickNames }));
    },
    [status]
  );

  return { data, fetch };
};
