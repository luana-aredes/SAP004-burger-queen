import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Pages/Register/index.jsx';
import Login from './Pages/Login/index.jsx';
import Menu from './Pages/Menu/Menu.jsx';
import Kitchen from './Pages/ Kitchen/Kitchen';

const App = () => {

  return (
    <Router >
      <Switch >
        <Route path="/" exact >
          < Login />
        </Route>
        <Route path="/register" >
          < Register />
        </Route>
        <Route path="/salao" >
          <Menu />
        </Route>
        <Route path="/cozinha">
          <Kitchen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App