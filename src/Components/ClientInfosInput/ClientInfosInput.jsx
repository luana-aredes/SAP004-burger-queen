import React from 'react';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  input: {
    padding: '4px',
    fontSize: '1.1em',
    margin: '5px',
    width: '45%',
    '@media (min-width: 1025px)': {
      height: '30px'
    },
  },
});

const ClientInfosInput = (props) => {
  return (
    <input type={props.type}
      className={css([styles.input])}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
export default ClientInfosInput;
