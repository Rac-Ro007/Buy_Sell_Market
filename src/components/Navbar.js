import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import { Navbar as Navbar1, Nav, Form, FormControl, Button } from "react-bootstrap";
  

class Navbar extends Component {

    render() {
        return (
            <div>
            {/* <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                >
                
                </a>
                <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white"><span id="account"></span></small>
                </li>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="ip">IPFS Storage</span></small>
                </li>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white"><span id="st">Market</span></small>
                </li>
                </ul>
            </nav> */}
                <Navbar1 bg="primary" variant="dark">
                <Navbar1.Brand href="/">DeFleet Dapp Marketplace</Navbar1.Brand>
                <Nav className="mr-auto">
                <Nav.Link style={{}} href="#home">{this.props.account}</Nav.Link>
                <Nav.Link href="storage">IPFS Drive</Nav.Link>
                <Nav.Link href="about">About</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar1>
            </div>
         );
    }
}

export default Navbar;