import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/User'
import Project from './components/Project'
import Home from './components/Home'
import App from './App';
import About from './About'
// import { Router, Route, browserHistory } from 'react-router';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  // <Router history={browserHistory}>
  <BrowserRouter>
    <Route path="/" component={Home}/>
    <Route path="/user/*" component={User}/>
    <Route path="/project/*" component={Project}/>
  </BrowserRouter>
), document.getElementById('root'));
