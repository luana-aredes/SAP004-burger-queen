import React, { useState } from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import { auth } from '../../config/firebase'
import authMainErrors from './firebase-error'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styles from '../Style/login-register'
import { css } from 'aphrodite';
import Logotype from '../../../src/assets/logotipo.png';
import BurguerImg from '../../../src/assets/circle-burger.png';


const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [errorMsg, setErrorMsg] = useState();

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => props.history.push('/admin'))
      .catch(function (error) {
        const errorCode = error.code;
        if (authMainErrors[errorCode]) {
          setErrorMsg(authMainErrors[errorCode])
        } else {
          (setErrorMsg('Ocorreu um erro. Verifique os dados'))
        }
      })
  };

  const sendFormToAuth = (event) => {
    event.preventDefault();
    signIn(email, password);
  }

  return (
    <main className={css(styles.pageContainer)} >
      <section className={css(styles.imagesContainer)} >
        <img className={css(styles.logoImg)}
          src={Logotype}
          alt="Logotipo" />
        <img className={css(styles.burguerImg)}
          src={BurguerImg}
          alt="Imagem de hamburguer" />
      </section>

      <section className={css(styles.formContainer)} >
        <form className={css(styles.form)} >
          <fieldset className={css(styles.fieldset)} >
            <Input type='email'
              value={email}
              placeholder='Digite seu e-mail'
              onChange={
                (event) => setEmail(event.target.value)
              }
            />
            <Input type='password'
              value={password}
              placeholder='Digite sua senha'
              onChange={
                (event) => setPassword(event.target.value)
              }
            /> <Button name='Entrar'
              handleCLick={
                (e) => sendFormToAuth(e)
              }
            />
          </fieldset>
        </form>
        <div className={css(styles.registerLink)} >
          <
    p > Se não tem uma conta, <
    Link to='/register'
              className={css(styles.registerLink)} > registre - se! < /Link>  < /
    p > <
    p > {errorMsg} < /p> < /
    div > <
    /section> < /
    main >
  );
}

export default withRouter(Login);