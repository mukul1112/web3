const ether=require("ethers");
const provider=new ether.JsonRpcProvider(`https://sepolia.infura.io/v3/e67ad6d79a77467d88b238c3b10a2465`);

const contractadd="0xec1489d6a78cbbd2295da2ebb36fcaf280e8f090";
const contractabi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "log",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "eth",
				"type": "address"
			}
		],
		"name": "calleth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkbalnce",
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
		"inputs": [
			{
				"internalType": "address payable",
				"name": "eth",
				"type": "address"
			}
		],
		"name": "sendeth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "eth",
				"type": "address"
			}
		],
		"name": "transeth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "eth",
				"type": "address"
			}
		],
		"name": "transeth1",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

const contractintreact=async()=>{
    const mycontract=new ether.Contract(contractadd,contractabi,provider);
    const contractbal=await mycontract.checkbalnce();
    const ethbalance=ether.formatEther(contractbal);
    console.log(ethbalance); 
}
contractintreact();