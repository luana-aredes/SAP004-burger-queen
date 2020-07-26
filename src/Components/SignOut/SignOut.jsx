import React from 'react';
import { withRouter } from "react-router-dom";
import LogOut from '../../../src/assets/logOut.png';
import { auth } from '../../config/firebase';
import { StyleSheet, css } from 'aphrodite';


const SignOut = (props) => {
  const signOut = () => {
    auth.signOut().then(() => {
      props.history.push('/')
    }).catch(error => {
      console.log(error)
    });
  }

  return ( <
    figure >
    <
    img className = { css(styles.logoutBtn) }
    src = { LogOut }
    alt = "Sair"
    onClick = { signOut }
    /> < /
    figure >
  )
}

export default withRouter(SignOut);

const styles = StyleSheet.create({
  logoutBtn: {
    width: '32px',
    height: '32px'
  },
});