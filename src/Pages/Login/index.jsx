import React, { useState } from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import { auth } from '../../config/firebase'
import authMainErrors from './firebase-error'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styles from '../Style/login-register'
import { css } from 'aphrodite';
import HomeImages from '../../Components/HomeImages/HomeImages'

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [errorMsg, setErrorMsg] = useState();

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => props.history.push('/admin'))
      .catch(function (error) {
        if (authMainErrors[error.code]) {
          setErrorMsg(authMainErrors[error.code])
        } else {
          (setErrorMsg('Ocorreu um erro. Tente novamente'))
        }
      })
  };

  const sendFormToAuth = (event) => {
    event.preventDefault();
    signIn(email, password);
  }

  return (
    <main className={css(styles.pageContainer)} >
      <section className={css(styles.imgContainer)}>
        <HomeImages />
      </section>

      <section className={css(styles.formContainer)} >
        <form className={css(styles.form)} >
          <fieldset className={css(styles.fieldset)} >
            <Input type='email'
              value={email}
              placeholder='Digite seu e-mail'
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input type='password'
              value={password}
              placeholder='Digite sua senha'
              onChange={
                (event) => setPassword(event.target.value)
              }
            />
            <Button
              name='Entrar'
              handleCLick={
                (e) => sendFormToAuth(e)
              }
            />
          </fieldset>
        </form>
        <div className={css(styles.registerText)} >
          <p > Se não tem uma conta,
          <br />
            <Link to='/register'>registre - se!</Link>
          </p>
        </div>
        {errorMsg ? (
          <div className={css(styles.alertError)}>
            {errorMsg}
          </div>
        ) : null
        }
      </section>
    </main>
  );
}

export default withRouter(Login);