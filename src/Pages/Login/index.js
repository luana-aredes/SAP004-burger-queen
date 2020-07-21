import React, { useState } from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import firebase from '../../config/firebase'
import authMainErrors from './firebase-error'



const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [errorMsg, setErrorMsg] = useState('Possível Msg de erro');

  const signIn = (email, password) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(console.log('Redirecione para a próxima página'))
      .catch(function (error) {
        const errorCode = error.code;
        if (authMainErrors[errorCode]) {
          setErrorMsg(authMainErrors[errorCode])
        }
      })
  };

  const sendForm = (event) => {
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
      (event) => setEmail(event.target.value) }
    /> <
    Input type = 'password'
    value = { password }
    placeholder = 'Digite sua senha'
    onChange = {
      (event) => setPassword(event.target.value) }
    /> <
    Button name = 'Entrar'
    handleCLick = {
      (e) => sendForm(e) }
    /> <
    /form> <
    p >
    Se não tem uma conta, registre - se. <
    /p> <
    p style = {
      { color: 'red' } } > { errorMsg } <
    /p> <
    /div>
  );
}

export default LoginPage;