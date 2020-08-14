import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '45px',
    borderRadius: '20px',
    background: '#E5B163',
    border: 'none',
    fontSize: '1.4em',
    fontWeight: 'bold',
    outline: 'none'
  },
});

const Button = (props) => {
  return (
    <button className={css(styles.button)}
      onClick={props.handleCLick} value={props.value} > {props.name}
    </button>
  );
}

export default Button;

