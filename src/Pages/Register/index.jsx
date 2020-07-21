import React from 'react';
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input';
import { db, auth } from '../../config/firebase'




const Form = () => {

  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [name, setName] = React.useState('')
  const [option, setOption] = React.useState('')
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


  const register = React.useCallback(async() => {
    try {
      const loginData = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(loginData.user)
      await db.collection('users').doc(loginData.user.uid).set({
        Name: name,
        email: email,
        uid: loginData.user.uid,
        Sector: 'Cozinha'
      })
      setEmail('')
      setPass('')
      setName('')
      setError(null)

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
  }, [email, pass, name])


  return ( <
    div >
    <
    h3 className = "text-center" > Registro < /h3> <
    hr / >
    <
    form >
    <
    Input class = 'input-register'
    onChange = { e => (setName(e.target.value)) }
    value = { name }
    type = 'text'
    placeholder = 'Nome' / >
    <
    Input class = 'input-register'
    onChange = { e => (setEmail(e.target.value)) }
    value = { email }
    type = 'email'
    placeholder = 'E-mail' / >
    <
    Input class = 'input-register'
    onChange = { e => (setPass(e.target.value)) }
    value = { pass }
    type = 'text'
    placeholder = 'Senha' / >
    <
    label > Em qual setor você trabalha ?
    <
    select className = "sector"
    onChange = { e => (setOption(e.targer.value)) }
    value = { option } >
    <
    option value = { 'Cozinha' } > Cozinha < /option> <
    option value = { 'Salão' } > Salão < /option> <
    /select> <
    /label> <
    Button handleCLick = { createRegister }
    class = 'submit'
    name = 'Registrar' / >
    <
    /form> <
    /div >
  )


}

export default Form;