import React, { useState } from 'react';
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
    fontSize: '1.3em'
  },
  tableNumber: {
    backgroundColor: 'red'
  },
  displayFlex: {
    display: 'flex'
  }
});

const OrderSheet = () => {
  const [clientName, setClientName] = useState();
  const [tableNumber, setTableNumber] = useState();

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
            type='text' placeholder='Mesa'
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)} />
        </form>
      </section>
    </main>
  )

}
export default OrderSheet;


