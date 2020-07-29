import React from 'react';
import OrderTableRow from '../order_table_row/orderTableRow';

const OrderTable = (props) => {
  return (

    <
    table >
    <
    thead >
    <
    tr >
    <
    th > Produtos < /th> <
    th > Opções < /th> <
    th > Adicional < /th> <
    th > Quantidade < /th> <
    th > Preço < /th> <
    th > Deletar < /th> < /
    tr > <
    /thead> <
    tbody > {
      props.request.map((orderItem) => ( <
        OrderTableRow item = { orderItem.item }
        price = { orderItem.price }
        quantity = { orderItem.quantity }
        />
      ))
    }

    <
    /tbody> < /
    table >
  )
}

export default OrderTable;