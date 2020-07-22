import React from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { db, auth } from '../../config/firebase';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  red: {
    backgroundColor: 'red'
  },
  input: {
    width: '350px',
    height: '50px',
    boxSizing: 'border-box',
    alignSelf: 'center',
    color: '#420029',
    border: '1px solid #586B9F',
    borderRadius: '6px',
    margin: '0 0 5%',
    padding: '2%',
    fontSize: '1rem',
  },
  div: {
    display: 'block',
  },
  form: {
    width: '500px',
  },
  fieldset: {
    padding: '1vw 5vw',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: 'none'
  },
  button: {
    width: '350px',
    height: '50px',
    borderRadius: '20px',
    background: '#C3846D'
  },
  select: {
    width: '350px',
    height: '50px',
    alignSelf: 'center',
    color: '#420029',
    border: '3px solid #E5B163',
    boxSizing: 'border-box',
    borderRadius: '10px',
    margin: '0 0 5%',
    padding: '2%',
    fontSize: '1rem',
    backgroundColor: ' #4543B5;'
  },
  body: {
    width: '100%',
    height: '100%',
    background: ' #8E3712'
  },
  circle: {
    width: '400px',
    height: '400px',
    backgroundColor: '#E5B163',
    borderRadius: '200px',
    position: 'fixed',
    marginTop: '30px',
    marginLeft: '-10px',
  }
})


const Form = (props) => {

  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [name, setName] = React.useState('')
  const [sector, setSector] = React.useState('')
  const [error, setError] = React.useState(null)

  const createRegister = e => {
    e.preventDefault()
    if (!email.trim() || !pass.trim()) {
      console.log('Digite seu email!')
      setError('Dados vazios no campo de email!')
      return
    }
    if (!pass.trim()) {
      console.log('Digite sua senha!')
      setError('Dados vazios no campo senha!')
      return
    }
    if (pass.length < 6) {
      console.log('6 ou mais  caracteres')
      setError('6 ou mais  caracteres na senha')
      return
    }
    console.log('Correto!!')
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
        uidUser: loginData.user.
          Sector: sector
      })
      setEmail('')
      setPass('')
      setName('')
      setError(null)
      props.history.push('/login')
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        setError('Usuario ja registrado...')
        return
      }
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
        return
      }
    }
  }, [email, pass, name, sector, props.history])


  return (
    <main >
      <form className={css(styles.form)}>
        <fieldset className={css(styles.fieldset)}>
          <Input class={css(styles.input)} onChange={e => (setName(e.target.value))} value={name} type='text' placeholder='Nome' />
          <Input class={css(styles.input)} onChange={e => (setEmail(e.target.value))} value={email} type='email' placeholder='E-mail' />
          <Input class={css(styles.input)} onChange={e => (setPass(e.target.value))} value={pass} type='text' placeholder='Senha' />
          <div className={css(styles.div)}>
            <label >Em qual setor você trabalha? </label>
            <select className={css(styles.select)} onChange={e => (setSector(e.target.value))} value={sector}>
              <option value=''> Selecione...</option>
              <option value='Cozinha'>Cozinha</option>
              <option value='Salão'>Salão</option>
            </select>
          </div>
          <Link to={`/login`}>
            <Button handleCLick={createRegister} class='submit' class={css(styles.button)} name='Registrar' />
          </Link>
        </fieldset>
      </form>
      <div className={css(styles.circle)} ></div>
    </main>
  )


}

export default withRouter(Form);