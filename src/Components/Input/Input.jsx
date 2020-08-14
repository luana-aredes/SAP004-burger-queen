import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '45px',
    boxSizing: 'border-box',
    alignSelf: 'center',
    color: '#420029',
    border: '2px solid #E5B163',
    borderRadius: '10px',
    margin: '0 0 5%',
    padding: '4%',
    fontSize: '1.4rem',
    outline: 'none',
  },
});

const Input = (props) => {
  return (<
    input type={props.type}
    className={css(styles.input)}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    checked={props.checked}
  />
  );
}

export default Input;