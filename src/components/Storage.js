import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import IpContract from '../abis/Contract.json'
import 'bootstrap/dist/css/bootstrap.css'
import ipfs from './ipfs'
// import storehash from './storeHash'
import { Button, Form, Container, Table } from 'react-bootstrap'

class Storage extends Component {
 
  storehash=''
  
    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
    web3 = new Web3(window.web3.currentProvider);

    web3 = window.web3
    
    async loadWeb3() {
       if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // check accounts
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account : accounts[0]})
        //get Net ID
        const networkId = await web3.eth.net.getId()
        // Attach marketplace with networks of NetID
        const networkData = IpContract.networks[networkId]
        //connect with abi on network
        this.setState({networkData})
      }
    
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      networkData:''   
    };

captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };
 convertToBuffer = async(reader) => {
      //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };
onClick = async () => {
    const web3 = window.web3
    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        //get Transaction Receipt in console on click
        //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt

        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});

        }); //await for getTransactionReceipt
        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try

    catch(error){
        console.log(error);
      } //catch
  } //onClick
onSubmit = async (event) => {
    const web3 = window.web3
    // const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
      event.preventDefault();
     //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Sending from Metamask account: ' + accounts[0]);
      const storehash = web3.eth.Contract(IpContract.abi, accounts[0]);
    //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});
      console.log('ethaddress' + ethAddress);
    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log('Error - '+ err +'IPHash' +ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });
        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
        //return the transaction hash from the ethereum contract
      //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
              
        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0],gas:100000
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash 
      }) //await ipfs.add 
    }; //onSubmit
render() {
      
      return (
        <div>
        < Navbar />
        <div className="Container" align="center">
<Container>
<header className="App-header">
            <h1> Upload Documents to IPFS</h1>
          </header>
          
          <hr />
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
             <Button 
             bsStyle="primary" 
             type="submit"> 
             Send it 
             </Button>
          </Form>
<hr/>
 <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
 <hr />
  <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>
                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                
                </tbody>
            </Table>
        </Container>
     </div>
     </div>
      );
    } //render
} //App
export default Storage;