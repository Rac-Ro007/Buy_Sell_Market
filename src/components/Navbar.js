import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
  

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                >
                DeFleet Dapp Marketplace
                </a>
                <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white"><span id="account">{this.props.account}</span></small>
                </li>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="ip">IPFS Storage</span></small>
                </li>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white"><span id="st">Market</span></small>
                </li>
                </ul>
            </nav>
         );
    }
}

export default Navbar;