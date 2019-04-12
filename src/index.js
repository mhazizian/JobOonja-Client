import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/User'
import Project from './components/Project'
import Home from './components/Home'
import App from './App';
import About from './About'
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/user/*" component={User}/>
    <Route path="/project/*" component={Project}/>
  </Router>
), document.getElementById('root'));
