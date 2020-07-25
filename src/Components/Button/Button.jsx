import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Button = (props) => {
  return ( <
    button className = { css(styles.button) }
    onClick = { props.handleCLick } > { props.name } <
    /button>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '35px',
    borderRadius: '20px',
    background: '#E5B163',
    border: 'none',
    fontSize: '1.3em',
    fontWeight: 'bold'
  },
});