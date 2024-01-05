
import { Box, Button, CircularProgress, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect, } from 'react';

import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';

import { TickInfo } from '../../../types/tick-info.type';
import { addOrUpdateTick } from '../../../config/firebase/firebase-config';
import { StateStatus } from '../../../types/base-state.type';
import { fetchUserCoins } from '../store/crypto-table/crypto-table.actions';
import { fetchCoin, fetchCoins } from '../store/portfolio-store/portfolio.actions';
import { selectBtcPrice, selectCoinsList, selectStatus } from '../store/portfolio-store/portfolio.selectors';

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
            dispatch(fetchUserCoins({ timeType }));
            setSelectedCoin(null);
            setBuyingPrice('');
            setQuantity('');
            onClose();


        }
    };

    const handleSearchClick = async () => {
        await dispatch(fetchCoin({ timeType: timeType, tick }))
        setSelectedCoin(null);
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
            <Box>
                {(status === StateStatus.LOADING) ? (<CircularProgress />) : (
                    <div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color:"#ebb94c"}}>Tick</TableCell>
                                        <TableCell sx={{color:"#ebb94c"}}>sats/Tick</TableCell>
                                        <TableCell sx={{color:"#ebb94c"}}>USD/Tick</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {coins.map((coin, index) => (
                                        <TableRow
                                            key={index}
                                            hover
                                            onClick={() => handleAddCoin(coin)}
                                            selected={selectedCoin === coin}
                                        >
                                            <TableCell>{coin.tick}</TableCell>
                                            <TableCell>{coin.curPrice}</TableCell>
                                            <TableCell>{((coin.curPrice * btcPrice) / 1e8).toFixed(3)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {selectedCoin && (
                            <Box>
                                <Typography sx={{color:"#ebb94c", textAlign:'left', marginTop:'10px'}}>{selectedCoin.tick}</Typography>
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
                    </div>
                )}

            </Box>
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
        maxHeight: 1200,
    }
};
export default AddCoinModal;
