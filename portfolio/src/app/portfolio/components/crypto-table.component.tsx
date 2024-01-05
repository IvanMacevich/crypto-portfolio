import { CircularProgress, Icon, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { StateStatus } from "../../../types/base-state.type";
import { fetchUserCoins } from "../store/crypto-table/crypto-table.actions";
import {
  selectUserTickStatus,
  selectUserTicks,
} from "../store/crypto-table/crypto-table.selectors";

const CryptoTable = () => {
  const timeType = "day1";

  const dispatch = useAppDispatch();
  const ticks = useSelector(selectUserTicks);
  const status = useSelector(selectUserTickStatus);

  console.log(ticks);

  useEffect(() => {
    dispatch(fetchUserCoins({ timeType: timeType }));
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Coin",
        width: 400,
        sortable: false,
        filterable: false,
      },
      { field: "buyingPrice", headerName: "Buying price", width: 400 },
      { field: "curPrice", headerName: "Current price", width: 400 },
       { field: "amount", headerName: "Amount", width: 250 },
      { field: "changePrice", headerName: "Change price", width: 450 },
      // { field: "marketCap", headerName: "Market Cap", width: 250 },
      // { field: "totalMinted", headerName: "Total minted", width: 250 },
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
      {status === StateStatus.LOADING ? (
        <CircularProgress />
      ) : (
        <DataGrid
          columns={columns}
          rows={ticks.list}
          getRowId={(coins) => coins.name}
          pageSizeOptions={[5]}
          sx={{ backgroundColor: "#000000" }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
      )}
    </Box>
  );
};

export default CryptoTable;
