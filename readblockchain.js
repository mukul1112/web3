const ether=require("ethers");
const provider=new ether.JsonRpcProvider(`https://sepolia.infura.io/v3/e67ad6d79a77467d88b238c3b10a2465`);

//console.log(ether)
const querryBlockchain=async()=>{
    const block=await provider.getBlockNumber();
    console.log(block);
    const balance =await provider.getBalance("0x2D7fC3E26Eb6D1f11cA10575E1946EE6101F5B18");
   const ethbalance=ether.formatEther(balance);
    console.log(ethbalance);
}
querryBlockchain();