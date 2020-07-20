import React from 'react';
import './App.css';
import firebase from '../src/config/firebase';
import Button from './Components/Button/Button'
import Input from './Components/Input/Input'
const submit = () => {
  console.log('Registrei')
}

function App() {
  return (
    <form>
      <Input class='input-register' type='e-mail' placeholder='Email' />
      <Button handleCLick={submit} class='submit' name='Registrar' />
    </form>
  );
}

export default App;