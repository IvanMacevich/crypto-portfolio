import { Box, Button, List, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TickData {
    height: number;
    total: number;
    start: number;
    detail: Array<string>;
}
interface Tick {
    code: number;
    msg: string;
    data: TickData;
}

const AddCoinModal = () => {
    const [coins, setCoins] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get<Tick>(
                    'https://open-api.unisat.io/v1/indexer/brc20/list',
                    {
                        params: {
                            start: (page - 1) * limit,
                            limit: limit,
                        },
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Bearer 6aa7f1167c28b8c69cf242a78d29df1f305645d7c0211ab40cc4a88e60c63270',
                        },
                    }
                );

                if (response.status === 200) {
                    setCoins(response.data.data.detail || []);
                } else {
                    console.error('Failed to fetch coins');
                }
            } catch (error) {
                console.error('Error while fetching coins:', error);
            }
        };

        fetchCoins();
    }, [page, limit]);

    return (
        <Box sx={{ backgroundColor: '#fff1', maxWidth: 800, maxHeight:1200, position:'absolute'}}>
            <Typography>Search your favorite coin</Typography>

            <Box>
                <List>
                    {coins.map((coin, index) => (
                        <li key={index}>{coin}</li>
                    ))}
                </List>

                <Button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
                    Previous Page
                </Button>
                <Button onClick={() => setPage((prevPage) => prevPage + 1)}>Next Page</Button>
            </Box>
        </Box>
    );
};

export default AddCoinModal;
