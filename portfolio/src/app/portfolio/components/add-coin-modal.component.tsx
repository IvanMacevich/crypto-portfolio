
import { Box, Button, Input, List, ListItem, TextField, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TickList } from '../../../types/tick-list.type';
import { instance } from '../../../config/api/axios.instance';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { fetchCoin, fetchCoins } from '../store/coins-list/portfolio.actions';
import { selectBtcPrice, selectCoinsList, selectStatus } from '../store/coins-list/portfolio.selectors';
import { selectCoinInfo } from '../store/coin-info/coin-info.selectors';
import { fetchCoinInfo } from '../store/coin-info/coin-info.actions';
import { TickInfo } from '../../../types/tick-info.type';
import { addOrUpdateTick } from '../../../config/firebase/firebase-config';
import { StateStatus } from '../../../types/base-state.type';

interface AddCoinModalProps {
    onClose: () => void;
}
const AddCoinModal: React.FC<AddCoinModalProps> = ({ onClose }) => {
    const theme = useTheme();
    const userId = 'f0gc5oHPjgT0vJJSq03P'
    const timeType = 'day1';

    const dispatch = useAppDispatch();
    const coins = useSelector(selectCoinsList);
    const btcPrice = useSelector(selectBtcPrice);
    const status = useSelector(selectStatus);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [tick, setTick] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<TickInfo | null>(null);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setTick(event.target.value);
        if (!event.target.value) {
            dispatch(fetchCoins({ page, limit }));
        }
    };

    const handleSaveCoin = () => {
        if (selectedCoin) {
            const tickToAdd = {
                tick: selectedCoin.tick,
                amount: parseFloat(quantity),
                buyingPrice: parseFloat(buyingPrice),
                userId,
            };
            addOrUpdateTick(tickToAdd);
            setSelectedCoin(null);
            setBuyingPrice('');
            setQuantity('');
            onClose();
        }
    };

    const handleSearchClick = async () => {
        await dispatch(fetchCoin({ timeType: timeType, tick }))
    }
    const handleAddCoin = (selectedTick: TickInfo) => {
        setSelectedCoin(selectedTick);
        setBuyingPrice('');
        setQuantity('');
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        dispatch(fetchCoins({ page: page - 1, limit }));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        dispatch(fetchCoins({ page: page + 1, limit }));
    };

    useEffect(() => {
        dispatch(fetchCoins({ page, limit }));
    }, [dispatch, page, limit]);

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
            {(status === StateStatus.LOADING) ? (<h1>Loading</h1>) : (<div>
                <List sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px' }}>
                    {coins.map((coin, index) => (
                        <ListItem key={index} sx={styled.list} onClick={() => handleAddCoin(coin)}>
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

                {selectedCoin && (
                    <Box>
                        <TextField
                            id="standard-basic"
                            label="Buying Price"
                            variant="standard"
                            sx={{ width: '100%' }}
                            value={buyingPrice}
                            onChange={(event) => setBuyingPrice(event.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Quantity"
                            variant="standard"
                            sx={{ width: '100%' }}
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                        <Button onClick={handleSaveCoin}>Save Coin</Button>
                    </Box>
                )}

                <Button onClick={handlePreviousPage}>Previous Page</Button>
                <Button onClick={handleNextPage}>Next Page</Button>
            </div>)}

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
