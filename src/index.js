import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/User'
import App from './App';
import About from './About'
import { Router, Route, browserHistory } from 'react-router';

// import './index.css';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// insert into index.js

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/user" component={User}/>
    <Route path="/user/*" component={User}/>
  </Router>
), document.getElementById('root'));
// serviceWorker.unregister();
