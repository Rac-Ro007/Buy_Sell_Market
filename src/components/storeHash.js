import Web3 from 'web3';
//access our local copy to contract deployed on rinkeby testnet
//use your own contract address

const web3 = new Web3(window.web3.currentProvider);

// const web3 = window.web3
    // check accounts
const accounts = web3.eth.getAccounts()
console.log(accounts)

// const address = accounts.address
const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
//use the ABI from your contract
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "sendHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const storehash = web3.eth.Contract(abi, address);
export default storehash