import { Avatar, Box, Icon, IconButton, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

interface CoinData {
  png64: string;
  temporaryId: string;
  name: string;
  rate: number;
  hour: number;
  day: number;
}
const CryptoTable = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const url = "https://api.livecoinwatch.com/coins/single";
    const apiKey = "7361e09d-8179-4b73-9f46-71170dd8f68e";

    try {
      const response = await axios.post(
        url,
        {
          currency: "USD",
          code: "OSPY",
          meta: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );
      console.log(response.data);
      const { name, rate, delta, png64 } = response.data;
      const { hour, day } = delta;
      const temporaryId = Date.now().toString();

      setCoins((prevData) => [
        ...prevData,
        { temporaryId, name, rate, hour, day, png64 },
      ]);
      console.log(coins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "CoinInfo",
        headerName: "Coin",
        width: 300,
        renderCell: (params: any) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={params.row.png64} />
            <Typography sx={{ marginLeft: 2 }}>{params.row.name}</Typography>
          </Box>
        ),
        sortable: false,
        filterable: false,
      },
      { field: "rate", headerName: "Price", width: 300 },
      { field: "hour", headerName: "1 h", width: 300 },
      { field: "day", headerName: "24 h", width: 300 },
      { field: "week", headerName: "7 d", width: 300 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <IconButton>
            <Icon sx={{ color: green[500] }}>+</Icon>
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
        rows={coins}
        getRowId={(coins) => coins.temporaryId}
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
