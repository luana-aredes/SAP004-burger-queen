import React from 'react';
import { StyleSheet, css } from 'aphrodite'
import Logotype from '../../../src/assets/logotipo.png';
import BurguerImg from '../../../src/assets/circle-burger.png';


const HomeImages = () => {
  return (
    <main className={css(styles.pageContainer)} >
      <section>
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
    width: '70%',
    marginTop: '80px',
  },
  logoImg: {
    width: '60%',
    marginTop: '3%',
    marginLeft: '3%',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '768px',
    maxHeight: '650px',
    backgroundColor: '#8E3712',
  }
});