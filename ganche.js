let Web3=require("web3");
let web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
//console.log(web3)
const main=async()=>{


let balance=await web3.eth.getBalance("0xc2600048458a892570D57928d2e4F09872a621d2");
console.log(balance)
console.log(web3.utils.fromWei(balance,"ether"));
web3.eth.sendTransaction({
    from:"0xc2600048458a892570D57928d2e4F09872a621d2",
    to:"0x311c32Ae23aCa3cf5221Dd7DA5af2728fEf63477",
    value:web3.utils.toWei("10","ether")
});
}
const contractcall= async()=>{
    let contract=  new web3.eth.Contract([
        {
            "inputs": [
                {
                    "internalType": "int256",
                    "name": "x",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "y",
                    "type": "int256"
                }
            ],
            "name": "add",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "addr",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "age",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "b1",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],"0xf5A139af56FB8Cb097bAEEaf81243D765D546eF1");

   let age=await contract.methods.age().call();
   console.log(age);
   await contract.methods.add(90,10).send({from:"0x627a5688844181A79AeB531Fb90FDEba52CFC1aa"});
   let ans =await contract.methods.add(90,10).call();
  console.log(ans);
}
contractcall();