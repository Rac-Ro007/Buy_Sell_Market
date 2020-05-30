import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Storage from './components/Storage';
import * as serviceWorker from './serviceWorker';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link, browserHistory, Switch } from 'react-router-dom'



ReactDOM.render(
        <Router>
            <Switch>
            {/* <App /> */}
          <Route path="/" exact component={App} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/storage" component={Storage} />
          </Switch>
        </Router>, document.getElementById('root')
     ); 
// ReactDOM.render(
//     <Router history = {browserHistory}>
//       <Route exact path = "/" component = {App}>
//          <Route path = "/Home" component = {Home} />
//          <Home />
//       </Route>
//    </Router>
// , document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
