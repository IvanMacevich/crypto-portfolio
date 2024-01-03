import React, { useEffect, useMemo, useState } from 'react';
import { db } from '../../../config/firebase/firebase-config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { Box } from '@mui/system';
import { Avatar, Icon, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
    const [ticksData, setTicksData] = useState([]);
    const userRef = doc(db, 'user', "f0gc5oHPjgT0vJJSq03P");
    useEffect(() => {
        const getTicks = async () => {
            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log(userData.ticks)
                    if (userData.ticks) {
                        const tickPromises = userData.ticks.map(async (tick: any) => {
                            const tickDoc = await getDoc(tick);
                            return tickDoc.data();
                        })
                        const ticksData = await Promise.all(tickPromises);
                        console.log(ticksData)
                    }

                    
                }
            } catch (err) {

            }
        }
        getTicks()
    }, [])
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
                        <Icon sx={{ color: 'green' }}>+</Icon>
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