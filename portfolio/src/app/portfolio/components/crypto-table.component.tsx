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
        width: 300,
        sortable: false,
        filterable: false,
        renderCell: (params: any) => (
          <Typography
            sx={{ color: "#ebb94c", fontSize: "20px", fontWeight: "700" }}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "buyingPrice",
        headerName: "Buing price",
        width: 300,
        renderCell: (params: any) => <span>{params.value}$</span>,
      },
      {
        field: "curPrice",
        headerName: "Current price",
        width: 300,
        renderCell: (params: any) => <span>{params.value}$</span>,
      },
      // { field: "amountOf", headerName: "Amount volume", width: 250 },
      {
        field: "changePrice",
        headerName: "Change price",
        width: 300,
        renderCell: (params: any) => <span>{params.value}$</span>,
      },
      // { field: "marketCap", headerName: "Market Cap", width: 250 },
      // { field: "totalMinted", headerName: "Total minted", width: 250 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 200,
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
    <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        BRC-20 COINS PORTFOLIO
      </Typography>
      {status === StateStatus.LOADING ? (
        <CircularProgress />
      ) : (
        <DataGrid
          autoHeight
          columns={columns}
          rows={ticks.list}
          getRowId={(coins) => coins.name}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
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
