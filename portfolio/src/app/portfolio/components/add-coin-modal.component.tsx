
import { Box, Button, Input, List, ListItem, TextField, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TickList } from '../../../types/tick-list.type';
import { instance } from '../../../config/api/axios.instance';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { fetchCoin, fetchCoins } from '../store/coins-list/portfolio.actions';
import { selectBtcPrice, selectCoinsList } from '../store/coins-list/portfolio.selectors';
import { selectCoinInfo } from '../store/coin-info/coin-info.selectors';
import { fetchCoinInfo } from '../store/coin-info/coin-info.actions';

interface AddCoinModalProps {
    onClose: () => void;
}
const AddCoinModal: React.FC<AddCoinModalProps> = ({ onClose }) => {
    const theme = useTheme();

    const dispatch = useAppDispatch();
    const coins = useSelector(selectCoinsList);
    const btcPrice = useSelector(selectBtcPrice);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [tick, setTick] = useState('');
    const timeType = 'day1';

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setTick(event.target.value);
        if(!event.target.value){
            dispatch(fetchCoins({ page, limit }));
        }
    };
    const handleSearchClick = async () => {
        await dispatch(fetchCoin({ timeType: timeType, tick }))
    }

    useEffect(() => {
        dispatch(fetchCoins({ page, limit }));
    }, [dispatch, page, limit]);


    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        dispatch(fetchCoins({ page: page - 1, limit }));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        dispatch(fetchCoins({ page: page + 1, limit }));
    };
    return (
        <Box sx={styled.modalStyle}>
            <TextField
                id="standard-basic"
                label="Tick"
                variant="standard"
                sx={{ width: "100%" }}
                value={tick}
                onChange={handleSearchChange}
            />
            <Button onClick={handleSearchClick}>Search</Button>
            <List sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px' }}>
                {coins.map((coin, index) => (
                    <ListItem key={index} sx={styled.list}>
                        <Typography color={theme.palette.secondary.main} sx={{ width: "100%", height: "100%", display: 'flex', alignItems: 'center' }}>
                            {coin.tick}
                        </Typography>
                        <Box>
                            <Typography color={theme.palette.primary.light}>
                                {coin.curPrice}
                            </Typography>
                            <Typography color={theme.palette.primary.light}>
                                sats/{coin.tick}
                            </Typography>
                            <Typography color={theme.palette.primary.light}>
                                {((coin.curPrice * btcPrice) / 1e8).toFixed(3)}$
                            </Typography>
                            <Typography color={theme.palette.primary.light}>
                                usd/{coin.tick}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Button onClick={handlePreviousPage}>Previous Page</Button>
            <Button onClick={handleNextPage}>Next Page</Button>
            <Button onClick={onClose}>Close Modal</Button>

        </Box>
    );
};
const styled = {
    list: {
        backgroundColor: '#fff1',
        height: '100px',
        width: '100%',
        borderRadius: 5,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    modalStyle: {
        padding: '10px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#252525',
        border: `1px solid #ebb94c`,
        width: 800,
        maxWidth: 1200,
        maxHeight: 1200,
    }
};
export default AddCoinModal;
