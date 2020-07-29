import React from 'react'
import Button from '../Button/Button'

const OrderTableRow = (props) => {
  return ( <
    tr className = { props.class } >
    <
    td > { props.item } < /td> <
    td >
    <
    div > { 'Opções' } < /div>

    <
    /td> <
    td >
    <
    div > { 'Adicionais' } < /div>

    <
    /td> <
    td >
    <
    Button name = { '-' }
    /> <
    Button name = { props.quantity }
    /> <
    Button name = { '+' }
    /> < /
    td >

    <
    td > { props.price } < /td> <
    td >
    <
    Button name = { 'delete' }
    /> < /
    td > <
    /tr>
  )
}
export default OrderTableRow