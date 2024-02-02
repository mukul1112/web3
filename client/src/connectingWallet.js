import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ethereum from "@metamask/detect-provider"
import ABI from './abi.json'


function Metamaskconnection() {
    const[amount,setAmount]=useState(null)
    const [balance, setbalance] = useState(null)
    const [address, setaddress] = useState(null)
    let address1;
    let signer = null;
    let provider = null;
    const connectwallet = async () => {
        console.log("h1")

        if (window.ethereum == null) {


            console.log("MetaMask not installed; using read-only defaults")
            provider = ethers.getDefaultProvider()
            // setError=('install metamask')
            console.log("3")

        } else {
            console.log("2")

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            address1 = account;
            console.log(account)
            setaddress(account)
            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();


        }

        // 17574717

        // Get the current balance of an account (by address or ENS name)
        const balance1 = await provider.getBalance(address1)
        // 182334002436162568n
        console.log(balance1)
        // Since the balance is in wei, you may wish to display it
        // in ether instead.
        const val = ethers.formatEther(balance1)
        setbalance(val)
        // '0.182334002436162568'

    }
    const handlechange=(e)=>{
        setAmount(e.target.value)
    }
    const contactacess = async (e) => {
        e.preventDefault();
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
        const contract = new ethers.Contract("0x0B48cF015C837F9f07C2a6E6f9838c6aef7d25A1", ABI, signer)
        const eth=amount;
        console.log(eth)
       await contract.transeth("0xd681f395f17857341d9a392a6506fdc90d306eda",{value:ethers.parseEther(eth)});
       
    }




    return (
        <>
            <h1>hello connecting to meta mask</h1>
            <button onClick={connectwallet}> Connect To Wallet</button>
            <br></br>
            <p>balance:{balance}</p>
            <p>Address:{address}</p>
            <form onSubmit={contactacess}>
            <input type="text" placeholder="enterEth" name="amount" value={amount} onChange={handlechange} />
            <button type="submit">transfereth</button>
            </form>


        </>
    )
}
export default Metamaskconnection;