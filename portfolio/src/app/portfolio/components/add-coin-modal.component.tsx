
import { Box, Button, Input, List, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TickList } from '../../../types/tick-list.type';
import { instance } from '../../../config/api/axios.instance';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { fetchCoins } from '../store/coins-list/portfolio.actions';
import { selectCoinsList } from '../store/coins-list/portfolio.selectors';
import { selectBtcPrice, selectCoinInfo } from '../store/coin-info/coin-info.selectors';
import { fetchCoinInfo } from '../store/coin-info/coin-info.actions';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1234',
    maxWidth: 800,
    maxHeight: 1200,
};




interface AddCoinModalProps {
    onClose: () => void;
}
const AddCoinModal: React.FC<AddCoinModalProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const coins = useSelector(selectCoinsList);
    const coinInfo = useSelector(selectCoinInfo)
    const btcPrice = useSelector(selectBtcPrice);
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
    const [buyingPrice, setBuyingPrice] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const handleCoinSelection = async (selectedCoin: string) => {
        setSelectedCoin(selectedCoin);
        await dispatch(fetchCoinInfo({ timeType: 'day1', ticks: [selectedCoin] }))
        console.log(coinInfo[0])
        console.log(btcPrice)
    };

    useEffect(() => {
        dispatch(fetchCoins({ page, limit }));
    }, [dispatch, page, limit]);
    useEffect(() => {
        if (coinInfo && coinInfo[0]) {
            console.log(btcPrice)
            const usdEquivalent = (coinInfo[0].curPrice * btcPrice) / 1e8;
            setBuyingPrice(usdEquivalent);
        }
    }, [coinInfo, btcPrice]);
    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        dispatch(fetchCoins({ page: page - 1, limit }));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        dispatch(fetchCoins({ page: page + 1, limit }));
    };
    return (
        <Box sx={modalStyle}>
            <Typography>Search your favorite coin</Typography>

            <List>
                {coins.map((coin, index) => (
                    <li key={index} onClick={() => handleCoinSelection(coin)}>
                        {coin}
                    </li>
                ))}
            </List>

            {selectedCoin && (
                <Box>
                    <Typography>{selectedCoin}</Typography>
                    <Typography>{buyingPrice}$</Typography>
                </Box>
            )}

            <Button onClick={handlePreviousPage}>Previous Page</Button>
            <Button onClick={handleNextPage}>Next Page</Button>

            <Button onClick={onClose}>Close Modal</Button>

        </Box>
    );
};

export default AddCoinModal;
