import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddCoinModal from '../components/add-coin-modal.component';
import { Button } from '@mui/material';
import CryptoTable from '../components/crypto-table.component';

const CryptoInfo = () => {

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <Button onClick={handleModal}>Add Coin</Button>
            <CryptoTable></CryptoTable>
            {isModalOpen && <AddCoinModal onClose={handleModal} />}
        </div>
    );
};

export default CryptoInfo;