import { Icon, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../config/firebase/firebase-config";
import { useAppDispatch } from "../../../store/store";
import { fetchCoinInfo } from "../store/coin-info/coin-info.actions";
import { useTicks } from "./use-tick.hook";

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
  const userRef = doc(db, "tick", "f0gc5oHPjgT0vJJSq03P");
  const ticks = useTicks();

  useEffect(() => {
    getTicks();
    // getUserId("f0gc5oHPjgT0vJJSq03P");
  }, []);

  const getTicksByUserId = async (userId: any) => {
    try {
      const userRef = doc(db, "user", userId);
      const userDoc = await getDoc(userRef);
      console.log(userDoc.data());

      if (userDoc.exists()) {
        const tickQuery = query(
          collection(db, "tick"),
          where("userId", "==", userRef)
        );
        const tickSnapshot = await getDocs(tickQuery);
        console.log(tickSnapshot);

        if (!tickSnapshot.empty) {
          const tickArray = tickSnapshot.docs.map((tickDoc) => tickDoc.data());
          console.log(tickArray);
          return tickArray;
        }
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // const getTicks = async () => {
  //   try {

  //         const tickNames = ticksData.map((ticksData) => ticksData.name);
  //         console.log(tickNames);
  //         ticks.fetch(tickNames);
  //         console.log(coinInfo);
  //         const combinedData: TicksData[] = ticksData?.map((ticks) => {
  //           const dynamicData = coinInfo.find((d) => d.tick === ticks.name);
  //           if (dynamicData) {
  //             return {
  //               name: String(ticks.name),
  //               buyingPrice: Number(ticks.buyingPrice),
  //               curPrice: dynamicData.curPrice,
  //               amountOf: dynamicData.amountVolume,
  //               changePrice: dynamicData.changePrice,
  //               marketCap: dynamicData.cap,
  //               totalMinted: dynamicData.totalMinted,
  //             };
  //           }
  //           return {
  //             name: String(ticks.name),
  //             buyingPrice: Number(ticks.buyingPrice),
  //             curPrice: 0,
  //             amountOf: 0,
  //             changePrice: 0,
  //             marketCap: "",
  //             totalMinted: 0,
  //           };
  //         });

  //         console.log(combinedData);
  //         setCoinsData(combinedData);
  //         console.log(coinsData);
  //       }
  //     }
  //   } catch (err) {}
  // };

  const getTicks = async () => {
    try {
      const ticksData = await getTicksByUserId("f0gc5oHPjgT0vJJSq03P");
      const tickNames = ticksData?.map((ticksData) => String(ticksData.tick));
      console.log(tickNames);
      if (tickNames) {
        ticks.fetch(tickNames);
        console.log(ticks.data);
      }

      if (ticksData) {
        console.log("HIII");
        const combinedData: TicksData[] = ticksData.map((ticks) => {
          const dynamicData = ticks.data.find(
            (d: any) => d.tick === ticks.tick
          );
          console.log(dynamicData);
          if (dynamicData) {
            console.log(dynamicData);
            return {
              name: String(ticks.tick),
              buyingPrice: Number(ticks.buyingPrice),
              curPrice: dynamicData.curPrice,
              amountOf: dynamicData.amountVolume,
              changePrice: dynamicData.changePrice,
              marketCap: dynamicData.cap,
              totalMinted: dynamicData.totalMinted,
            };
          }
          return {
            name: String(ticks.tick),
            buyingPrice: Number(ticks.buyingPrice),
            curPrice: 0,
            amountOf: 0,
            changePrice: 0,
            marketCap: "",
            totalMinted: 0,
          };
        });
        console.log(combinedData);
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
