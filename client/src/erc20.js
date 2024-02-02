import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React,{useEffect, useState} from 'react';
import { Block, ethers } from 'ethers';
import ABI from './mytokenabi.json'
import Table from 'react-bootstrap/Table';
import{Link} from 'react-router-dom';



function Erc20(){
    //const add="0x58380AF358e62Bda65b49Ec5547ed0634D407F1a"
    //  0x1891394E14aa9748f96BE13F6feD06C0D8D73856

    const [txn,settxns]=useState([])
    const [address, setaddress] = useState(null)
    const [contractInfo , setContractInfo]=useState({
    tokenName:"-",
    totalSupply:"-",
    tokenSymbol:"-"

  });
  const[balnceInfo,setbalanceInfo]=useState({
    address:"-",
    balance:"_" 
  });
  const[transfer,setTransferInfo]=useState({
    address:"",
    Amount:"" 
  });
  const saveadress=(e)=>{
    e.preventDefault();
    setaddress(e.target.value)
    console.log("1")

  }
    const handlesubmit= async(e)=>{
      e.preventDefault();
       const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        console.log(address)
        console.log(signer)
        const erc20 = new ethers.Contract(address, ABI, signer)
        
        const tokenname= await erc20.name();
        const tokensymbol=await erc20.symbol();
        const totalsupply=await erc20.totalSupply();
        const supply=ethers.formatEther(totalsupply).toString()
        console.log("2")
        setContractInfo({
            tokenName:tokenname,
            totalSupply:supply,
            tokenSymbol:tokensymbol
        
          });
          console.log(contractInfo.tokenName)
          console.log(contractInfo.tokenSymbol)
          console.log(contractInfo.totalSupply)
        

    }
    const getmybalance=async()=>{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
     const address1 = account;
      console.log(account)
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts",[]);
      const signer = await provider.getSigner();
      const singneraddress=await signer.getAddress();
      const erc20 = await new ethers.Contract(address, ABI, signer)
      const balance11=await erc20.balanceOf(address1  );
      const balance1=ethers.formatEther(balance11);
      setbalanceInfo({
        address:address1,
        balance:balance1
      })

    }
    const handeltransfer=async(e)=>{
        e.preventDefault();
        console.log(transfer)
        console.log("0")
     const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts",[]);
      const signer = await provider.getSigner();
      console.log("1")
      console.log(transfer.address)
      const erc20 = await new ethers.Contract(address, ABI, signer)
      const amount= ethers.parseEther(transfer.Amount);
      //const address=transfer.address
      console.log(amount)
     const tx = await erc20.transfer(transfer.address,amount);
     await tx.wait();
     console.log(tx.hash)
     
    }
    // useEffect(()=>{
    //   async function fetchData(){
    //   if(address !==null){
    //     const provider = new ethers.BrowserProvider(window.ethereum)
    //     await provider.send("eth_requestAccounts",[]);
    //     const signer = await provider.getSigner();
    //     const erc20 = await new ethers.Contract(address, ABI, signer)


    //     await erc20.on("Transfer", async(from, to, amoun, event) => {
    //       const _amonut=ethers.formatEther(amoun)
    //       console.log(from,to,_amonut,event)
    //       console.log("Hello ");
    //       console.log(event.log);
       
    //     settxns((curntTxns)=>[
    //       ...curntTxns,{
    //         txnHash:event.ContractEventPayload.log.transactionHash,
    //         from,
    //         to,
    //         amount:_amonut
    //       }

    //     ])
    //     event.removeListener();
    //   });
      
    //   }
    // }
    // fetchData();
    // },[address])



    return(
        <>
        <div>
          <Link to="/">Go to products</Link>
        </div>
        <div className='container'>
        <form  onSubmit={handlesubmit}>
     <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label" className='text'>READING ERC20 TOKEN</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder='Enter contract address'
     value={address}
     onChange={saveadress}/>
    <div id="emailHelp" class="form-text"></div>
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
  </form>
   <div>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>TokenName</th>
          <th>TokenSymbol</th>
          <th>TotalSupply</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{contractInfo.tokenName}</td>
          <td>{contractInfo.tokenSymbol}</td>
          <td>{contractInfo.totalSupply}</td>
        </tr>
        </tbody>
    </Table>
   </div>
     <div>
      <button  class="btn btn-primary" onClick={getmybalance}>Get The Balance</button>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{balnceInfo.address}</td>
          <td>{balnceInfo.balance}</td>
        </tr>
        </tbody>
    </Table>
     </div>
     <div>
     <form  onSubmit={handeltransfer}>
     <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label" className='text'>WRITING ERC20 TOKEN</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder='Enter account address'
    value={transfer.address}
     onChange={(e)=>setTransferInfo({address:e.target.value})}/>
    <div id="emailHelp" class="form-text">{transfer.address}</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label"></label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder='Enter amount to transfer'
    value={transfer.amount}
     onChange={(e)=>setTransferInfo({Amount:e.target.value,address:transfer.address})}/>
    <div id="emailHelp" class="form-text">{transfer.Amount}</div> 
  </div>
  <button type="submit" class="btn btn-danger " >Trasfer {contractInfo.tokenName}</button>
  </form>
     </div>
      {/* <div>{txn.map((even,i)=>
      <div key={i}>
       <p>From:{even.from}</p>
       <p>From:{"===>"}</p>
       <p>From:{even.to}</p>
       <p>Amount:{even._amonut}</p>
       <p>hash:{even.txnHash}</p>

      </div>
      )}
      </div> */}


     </div>
        
        </>
    )

}
export default Erc20;