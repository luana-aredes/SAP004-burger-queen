import React from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { db, auth } from '../../config/firebase';
import authMainErrors from './firebase-error'
import styles from '../Style/login-register'
import { css } from 'aphrodite';
import HomeImages from '../../Components/HomeImages/HomeImages';


const Form = (props) => {
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [confirmationPassword, setConfirmationPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [sector, setSector] = React.useState('')
  const [error, setError] = React.useState(null)

  const createRegister = e => {
    e.preventDefault()
    if (!email.trim() || !pass.trim()) {
      setError('Digite um email válido!')
      return
    }
    if (!pass.trim()) {
      setError('Digite sua senha!')
      return
    }
    if (pass.length < 6) {
      setError('A senha deve conter no mínimo 6 caracteres.')
      return
    }
    setError(null)
    register();
  }


  const register = React.useCallback(async () => {
    try {
      if (pass === confirmationPassword) {
        const loginData = await auth.createUserWithEmailAndPassword(email, pass)
        await db.collection('users').doc(loginData.user.uid).set({
          Name: name,
          email: email,
          uid: loginData.user.uid,
          Sector: sector
        })
        setEmail('')
        setPass('')
        setConfirmationPassword('')
        setName('')
        setError(null)
        props.history.push('/')
      } else {
        setError('As senhas não conferem, tente novamente!')
      }
    } catch (error) {
      if (authMainErrors[error.code]) {
        setError(authMainErrors[error.code])
      } else {
        (setError('Ocorreu um erro. Tente novamente'))
      }
    }
  }, [email, pass, confirmationPassword, name, sector, props.history])

  return (
    <main className={css(styles.pageContainer)} >
      <section>
        <HomeImages />
      </section>
      <section className={css(styles.formContainer)} >
        <form className={css(styles.form)} >
          <fieldset className={css(styles.fieldset)} >
            <Input onChange={e => (setName(e.target.value))}
              value={name}
              type='text'
              placeholder='Nome' />
            <Input onChange={e => (setEmail(e.target.value))}
              value={email}
              type='email'
              placeholder='E-mail' />
            <Input onChange={e => (setPass(e.target.value))}
              value={pass}
              type='password'
              placeholder='Senha' />
            <Input onChange={e => (setConfirmationPassword(e.target.value))}
              value={confirmationPassword}
              type='password'
              placeholder='Confirme a senha' />
            <div >
              <label className={css(styles.grayFont)} > Em qual setor você trabalha ? </label>
              <select className={css(styles.select)}
                onChange={e => (setSector(e.target.value))}
                value={sector} >
                <option value='' > Selecione... </option>
                <option value='Cozinha' > Cozinha </option>
                <option value='Salão' > Salão </option>
              </select>
            </div>
            <Button handleCLick={createRegister}
              name='Registrar'
              class={css(styles.red)} />
          </fieldset>
          {error ? (
            <div className={css(styles.alertError)}>
              {error}
            </div>
          ) : null
          }
        </form>
        <p className={css(styles.linkLogin)}>
          <Link className={css(styles.yellowFont)} to='/'>
            Logar
          </Link>
        </p>
      </section>
    </main >
  )
}
export default withRouter(Form);