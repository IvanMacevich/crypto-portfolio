import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CryptoTable from "../components/crypto-table.component";

const CryptoInfo = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "/api/1/brc20/balance?limit=20&offset=0&address=bc1qhgmu47f3kdqkqd03pctx89dt0rcyscchdxqlnm";
      const headers = {
        accept: "application/json",
        "api-key": "142cf1b0-1ca7-11ee-bb5e-9d74c2e854ac",
      };

      try {
        const response = await axios.get(url, { headers });
        const data = response.data;
        setActivities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    // <div>
    //   {activities !== null ? (
    //     <pre>{JSON.stringify(activities, null, 2)}</pre>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* <AddCoinModal /> */}
      <CryptoTable />
    </Box>
  );
};

export default CryptoInfo;
