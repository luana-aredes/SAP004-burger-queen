import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Logotype from '../../../src/assets/logotipo.png';
import BurguerImg from '../../../src/assets/circle-burger.png';

const HomeImages = () => {
  return (
    <main>
      <section className={css(styles.container)} >
        <img className={css(styles.logoImg)}
          src={Logotype}
          alt="Logotipo" />
        <img className={css(styles.burguerImg)}
          src={BurguerImg}
          alt="Imagem de hamburguer" />
      </section>
    </main>
  );
}

export default HomeImages;

const styles = StyleSheet.create({
  burguerImg: {
    position: 'absolute',
    bottom: '0',
    '@media (max-width: 481px)': {
      display: 'none',
    },
  },
  logoImg: {
    width: '60%',
    margin: '3%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 481px)': {
      alignItems: 'center'
    },
  }
});