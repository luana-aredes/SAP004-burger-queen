import React, { useState } from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import { auth } from '../../config/firebase'
import authMainErrors from './firebase-error'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";


const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [errorMsg, setErrorMsg] = useState();

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => props.history.push('/admin'))
      .catch(function (error) {
        const errorCode = error.code;
        if (authMainErrors[errorCode]) {
          setErrorMsg(authMainErrors[errorCode])
        }
      })
  };

  const sendFormToAuth = (event) => {
    event.preventDefault();
    signIn(email, password);
  }

  return ( <
    div >
    <
    form >
    <
    Input type = 'email'
    value = { email }
    placeholder = 'Digite seu e-mail'
    onChange = {
      (event) => setEmail(event.target.value)
    }
    /> <
    Input type = 'password'
    value = { password }
    placeholder = 'Digite sua senha'
    onChange = {
      (event) => setPassword(event.target.value)
    }
    /> <
    Button name = 'Entrar'
    handleCLick = {
      (e) => sendFormToAuth(e)
    }
    />  <
    /form> <
    p > Se não tem uma conta, <
    Link to = '/register' > registre - se < /Link> <
    /p> <
    p style = {
      { color: 'red' } } > { errorMsg } < /p>  <
    /div>
  );
}

export default withRouter(Login);