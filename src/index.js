import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/User'
import Project from './components/Project'
import Home from './components/Home'
import NotFound404 from './components/not_found404'
// import App from './App';
// import About from './About'
// import { Router, Route, browserHistory } from 'react-router';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom'

ReactDOM.render((
  // <Router history={browserHistory}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/user/*" component={User} />
      <Route path="/project/*" component={Project} />
      <Route path='*' component={NotFound404} />
    </Switch>

  </BrowserRouter>
), document.getElementById('root'));
