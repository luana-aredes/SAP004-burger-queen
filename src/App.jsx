import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Pages/Register/index.jsx';
import Login from './Pages/Login/index.jsx'

const App = () => {
  return (
    <Router >
      <Switch >
        <Route path="/" exact > < Login />
        </Route>
        <Route path="/register" > < Register />
        </Route>
        <Route path="/admin" > Rota adm </Route>
      </Switch>
    </Router>
  )
}

export default App