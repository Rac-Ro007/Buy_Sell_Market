import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json'
import Main from './Main'

class Home extends Component {
    render() {
      return (
         <div>
            <h1 style="color:blue;">IPFS</h1>
            <hr width="100%" />

         </div>
      );
   }
  }
  
  export default Home;