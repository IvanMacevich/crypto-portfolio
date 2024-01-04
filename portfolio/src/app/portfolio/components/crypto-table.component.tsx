import { Icon, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase/firebase-config";
import { useAppDispatch } from "../../../store/store";
import { fetchCoinInfo } from "../store/coin-info/coin-info.actions";
import { selectCoinInfo } from "../store/coin-info/coin-info.selectors";

interface TicksData {
  name: string;
  buyingPrice: number;
  curPrice: number;
  amountOf: number;
  changePrice: number;
  marketCap: string;
  totalMinted: number;
}

const CryptoTable = () => {
  // const [coins, setCoins] = useState<CoinData[]>([]);
  const [coinsData, setCoinsData] = useState<TicksData[]>([]);
  const dispatch = useAppDispatch();
  const coinInfo = useSelector(selectCoinInfo);
  const userRef = doc(db, "user", "f0gc5oHPjgT0vJJSq03P");

  useEffect(() => {
    getTicks();
  }, []);

  const getTicks = async () => {
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData.ticks);
        if (userData.ticks) {
          const tickPromises = userData.ticks.map(async (tick: any) => {
            const tickDoc = await getDoc(tick);
            return tickDoc.data();
          });
          const ticksData = await Promise.all(tickPromises);
          console.log(ticksData);
          const tickNames = ticksData.map((ticksData) => ticksData.name);
          console.log(tickNames);
          await fetchCoinData(tickNames);
          console.log(coinInfo);
          const combinedData: TicksData[] = ticksData.map((ticks) => {
            const dynamicData = coinInfo.find((d) => d.tick === ticks.name);
            if (dynamicData) {
              return {
                name: String(ticks.name),
                buyingPrice: Number(ticks.buyingPrice),
                curPrice: dynamicData.curPrice,
                amountOf: dynamicData.amountVolume,
                changePrice: dynamicData.changePrice,
                marketCap: dynamicData.cap,
                totalMinted: dynamicData.totalMinted,
              };
            }
            return {
              name: String(ticks.name),
              buyingPrice: Number(ticks.buyingPrice),
              curPrice: 0,
              amountOf: 0,
              changePrice: 0,
              marketCap: "",
              totalMinted: 0,
            };
          });

          console.log(combinedData);
          setCoinsData(combinedData);
          console.log(coinsData);
        }
      }
    } catch (err) {}
  };
  const fetchCoinData = async (tickNames: string[]) => {
    console.log(tickNames);
    await dispatch(fetchCoinInfo({ timeType: "day1", ticks: tickNames }));
  };

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Coin",
        width: 250,
        sortable: false,
        filterable: false,
      },
      { field: "buyingPrice", headerName: "Buing price", width: 250 },
      { field: "curPrice", headerName: "Current price", width: 250 },
      { field: "amountOf", headerName: "Amount volume", width: 250 },
      { field: "changePrice", headerName: "Change price", width: 250 },
      { field: "marketCap", headerName: "Market Cap", width: 250 },
      { field: "totalMinted", headerName: "Total minted", width: 250 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <IconButton>
            <Icon sx={{ color: "green" }}>+</Icon>
          </IconButton>
        ),
      },
    ],
    []
  );
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Coins
      </Typography>
      <DataGrid
        columns={columns}
        rows={coinsData}
        getRowId={(coins) => coins.name}
        pageSizeOptions={[10]}
        sx={{ backgroundColor: "#000000" }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
      />
    </Box>
  );
};

export default CryptoTable;
