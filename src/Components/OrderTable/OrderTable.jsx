import React from 'react';
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({

  scroll: {
    height: '200px',
    overflow: 'scroll',
  },
  tableColumn: {
    width: '16%'
  }
})
const OrderTable = (props) => {
  return (

    <table>
      <div className={css(styles.scroll)}>
        <thead >
          <tr >
            <th className={css(styles.tableColumn)}>Produtos</th>
            <th className={css(styles.tableColumn)}>Opções</th>
            <th className={css(styles.tableColumn)}>Adicional</th>
            <th className={css(styles.tableColumn)}>Quantidade</th>
            <th className={css(styles.tableColumn)}>Preço</th>
            <th className={css(styles.tableColumn)}>Delet.</th>
          </tr>
        </thead>
        <tbody>
          <OrderTableRow
            requestList={props.request}
          />
        </tbody>
      </div>
    </table>
  )
}

export default OrderTable;
