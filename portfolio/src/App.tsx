import React from 'react';
import { Route, Routes } from "react-router-dom";
import CryptoInfo from './app/portfolio/pages/crypto-info.page';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/portfolio-page' element={<CryptoInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
