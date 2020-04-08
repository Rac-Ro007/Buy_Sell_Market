import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';

function Home () {
      return (
         <div>
            < Navbar />
            <div className="container" align="center" style={{padding:100}}>
               <h1>IPFS</h1>
               <hr width="100%" />
            </div>
         </div>
      );
  }
  
  export default Home;