import React from 'react';
import './App.css';
<<<<<<< HEAD
import fire from '../src/config/firebase'

function App() {
  return ( <
    p > Ola! < /p>

=======
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
>>>>>>> f910a622fc0a8bf3473de9fc530536414bc2b288
  );
}

export default App;