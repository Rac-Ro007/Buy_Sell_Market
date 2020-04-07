import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json'
import Main from './Main'
import Home from './Home'
import About from './About'
import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom";


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
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString())
      this.setState({ productCount })
      for(var i=1; i <= productCount;i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products : [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
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
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct(name,price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name,price).send ({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading : false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading : true})
    this.state.marketplace.methods.purchaseProduct(id).send({ from:this.state.account, value : price })
    .once('receipt', (receipt) => {
      this.setState({ loading : false })
    })
  }

  render() {
    return (
      <div>
        <Router>
        {/* <Switch> */}
          < Navbar account = {this.state.account} />
          <main role="main" className="col-lg-12 d-flex">
          { this.state.loading
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
            : <Main 
              products = {this.state.products}
              createProduct = {this.createProduct} 
              purchaseProduct ={this.purchaseProduct}
              />
          }
        </main>
          <Route path="/home" component={Home} />
          {/* <Route path="/" exact component={work} /> */}
          <Route path="/about" component={About} />
        {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

const work = () => (
  <div>
    </div>
);

export default App;


