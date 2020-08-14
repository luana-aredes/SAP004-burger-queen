import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ClientInfosInput from '../ClientInfosInput/ClientInfosInput.jsx';

const styles = StyleSheet.create({
  container: {
    padding: '5px',
  },
  clientInfos: {
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2.0em',
    marginTop: '0px',
    marginBottom: '25px',
    '@media (min-width: 350px)': {
      fontSize: '1.0em'
    },
    '@media (min-width: 1024px)': {
      fontSize: '1.3em'
    },
  },
  tableNumber: {
    backgroundColor: 'red'
  },
  displayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});

const OrderSheet = (props) => {
  const [clientName, setClientName] = useState();
  const [tableNumber, setTableNumber] = useState();


  useEffect(() => {
    props.handleInputClientName(clientName)
  }, [clientName]);

  useEffect(() => {
    props.handleInputClientTable(tableNumber)
  }, [tableNumber]);

  return (
    <main className={css(styles.container)}>
      <section className={css(styles.clientInfos)}>
        <p className={css(styles.title)}>
          PEDIDO
         </p>
        <form className={css(styles.displayFlex)}>
          <ClientInfosInput type='text'
            placeholder='Nome do cliente'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)} />

          <ClientInfosInput
            class={css(styles.tableNumber)}
            type='number' placeholder='Mesa'
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)} />
        </form>
      </section>
    </main>
  )
}
export default OrderSheet;


