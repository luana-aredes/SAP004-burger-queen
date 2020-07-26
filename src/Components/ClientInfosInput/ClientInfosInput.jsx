import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ClientInfosInput = (props) => {
  return ( <
    input type = { props.type }
    className = { css([styles.input]) }
    placeholder = { props.placeholder }
    value = { props.value }
    onChange = { props.onChange }
    />
  );
}
export default ClientInfosInput;

const styles = StyleSheet.create({
  input: {
    padding: '4px',
    fontSize: '1.1em',
    margin: '5px',
    width: '45%'
  },
});