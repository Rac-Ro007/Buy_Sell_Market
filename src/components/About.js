import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';


function About () {
      return (
         <div>
            < Navbar />
            <div className="container" align="center" style={{padding:100}}>
               <h1>About IPFS</h1>
               <hr width="100%" />
            </div>
         </div>
      );
  }
  
  export default About;