import React from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { db, auth } from '../../config/firebase';
import styles from '../Style/login-register'
import { css } from 'aphrodite';
import Logotype from '../../../src/assets/logotipo.png';
import BurguerImg from '../../../src/assets/circle-burger.png';


const Form = (props) => {
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
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
      const loginData = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(loginData.user)
      await db.collection('users').doc(loginData.user.uid).set({
        Name: name,
        email: email,
        uid: loginData.user.uid,
        Sector: sector
      })
      setEmail('')
      setPass('')
      setName('')
      setError(null)
      props.history.push('/')
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        setError('Usuario ja registrado...')
        return
      }
      if (error.code === 'auth/invalid-email') {
        setError('Email invalido')
        return
      }
    }
  }, [email, pass, name, sector, props.history])
  return (
    <main className={css(styles.pageContainer)} >
      <section className={css(styles.imagesContainer)} >
        <img className={css(styles.logoImg)} src={Logotype} alt="Logotipo" />
        <img className={css(styles.burguerImg)} src={BurguerImg} alt="Imagem de hamburguer" />
      </section>
      <section className={css(styles.formContainer)} >
        <form className={css(styles.form)} >
          <fieldset className={css(styles.fieldset)} >
            {error ? (
              <div className={css(styles.alertError)}>
                {error}
              </div>
            ) : null
            }

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
              type='text'
              placeholder='Senha' />
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
            <Link to={`/login`} >
              <Button handleCLick={createRegister}
                name='Registrar'
                class={css(styles.red)} />
            </Link>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
export default withRouter(Form);