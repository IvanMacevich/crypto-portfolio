import { Button } from "@mui/material";
import { useState } from "react";
import AddCoinModal from "../components/add-coin-modal.component";
import CryptoTable from "../components/crypto-table.component";

const CryptoInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <CryptoTable></CryptoTable>
      <Button
        onClick={handleModal}
        variant="contained"
        color="secondary"
        size="large"
      >
        Add Coin
      </Button>
      {isModalOpen && <AddCoinModal onClose={handleModal} />}
    </div>
  );
};

export default CryptoInfo;
