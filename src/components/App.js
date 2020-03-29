import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

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
    const networkData = Marketplace.networks[networkId]
    //connect with abi on network
    if(networkData)
    {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      console.log(marketplace)
    }
    else {
      window.alert('MarketPlace contract not deployed on detected network')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  render() {
    return (
        < Navbar account = {this.state.account} />
    );
  }
}

export default App;
