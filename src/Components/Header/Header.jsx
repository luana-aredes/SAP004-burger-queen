import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Logotype from '../../../src/assets/logotipo.png';
import { Link } from 'react-router-dom';
import SignOut from '../SignOut/SignOut';

const styles = StyleSheet.create({
  deliveryList: {
    fontSize: '1.3em',
    color: '#E5E5E5',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  logotypeBtn: {
    width: '80px',
    height: '40px',
  },
  navbar: {
    display: 'flex',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8E3712',
    paddingTop: '5px',
  }
});

const Header = (props) => {
  return (
    <header className={css(styles.container)}>
      <nav className={css(styles.navbar)}>
        <figure>
          <img className={css(styles.logotypeBtn)}
            src={Logotype}
            alt="Logotipo" />
        </figure>
        <Link className={css(styles.deliveryList)}
          to='/'>Fila de espera
        </Link>
        <SignOut />
      </nav>
    </header>
  );
}
export default Header;

