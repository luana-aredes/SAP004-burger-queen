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
    textDecoration: 'none',
    marginLeft: '20px',
  },
  logotypeBtn: {
    width: '80px',
    height: '50px',
    // '@media (max-width: 600px)': {
    //   width: '80px',
    //   height: '60px',
    // }
  },
  navbar: {
    display: 'flex',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8E3712',
    padding: '5px',
    '@media (max-width: 500px)': {
      justifyContent: 'center',
    }
  },
  navbarLinks: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
    fontSize: '1.2em',
    '@media (max-width: 450px)': {
      fontSize: '1em',
    },
    '@media (min-width: 650px)': {
      justifyContent: 'flex-end'
    }
  }
});

const Header = (props) => {
  return (
    <header>
      <nav className={css(styles.navbar)}>
        <figure>
          <img className={css(styles.logotypeBtn)}
            src={Logotype}
            alt="Logotipo" />
        </figure>
        <div className={css(styles.navbarLinks)}>
          {props.place === 'kitchen' ?
            <>
              <Link className={css(styles.deliveryList)}
                to='/kitchen'>Cozinha
            </Link>
              <Link className={css(styles.deliveryList)}
                to='/requestHistory'>Histórico
          </Link>
            </> :
            <>
              <Link className={css(styles.deliveryList)}
                to='/saloon'>Salão
              </Link>
              <Link className={css(styles.deliveryList)}
                to='/requestToDeliver'>Pedidos prontos
              </Link>
            </>
          }
          <SignOut />
        </div>
      </nav>
    </header>
  );
}
export default Header;

