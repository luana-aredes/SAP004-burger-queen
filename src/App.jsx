import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Pages/Register';


const App = () => {
  return ( <
    Router >
    <
    Switch >
    <
    Route path = "/"
    exact >
    <
    Register / >
    <
    /Route> <
    Route path = "/login" >
    Rota de login <
    /Route> <
    Route path = "/admin" >
    Rota adm <
    /Route> <
    /Switch> <
    /Router>
  )
}

export default App