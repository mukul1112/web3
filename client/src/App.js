
import './App.css';
import {useEffect} from "react";
//const {ethers}=require('ethers');
import {ethers} from "ethers";
import Metamaskconnection from './connectingWallet';
import Erc20 from './erc20'
import Product from './Product';
import {BrowserRouter, Route, Routes} from "react-router-dom" 
function App() 
{
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Product/>}/>
      <Route path="/Token" element={<Erc20/>}/>
    </Routes>
    </BrowserRouter>
    
    </div>
  );
  }

export default App;
