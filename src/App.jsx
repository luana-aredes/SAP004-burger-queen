import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx';
import Saloon from './Pages/Saloon/Saloon.jsx';
import Kitchen from './Pages/ Kitchen/Kitchen';
import RequestHistory from './Pages/History/History.jsx'
import Delivery from './Pages/Delivery/Delivery'

const App = () => {

  return ( <
    Router >
    <
    Switch >
    <
    Route path = "/"
    exact >
    <
    Login / >
    <
    /Route> <
    Route path = "/register" >
    <
    Register / >
    <
    /Route> <
    Route path = "/saloon" >
    <
    Saloon / >
    <
    /Route> <
    Route path = "/kitchen" >
    <
    Kitchen / >
    <
    /Route> <
    Route path = "/requestHistory" >
    <
    RequestHistory / >
    <
    /Route> <
    Route path = "/delivery" >
    <
    Delivery / >
    <
    /Route> < /
    Switch > <
    /Router>
  )
}

export default App