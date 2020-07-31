import React, { useState } from 'react'
import { StyleSheet, css } from 'aphrodite';
import DeleteImg from '../../assets/trash.png'

const OrderTableRow = (props) => {
  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => setQuantity(quantity + 1)
  const decreaseQuantity = () => setQuantity(quantity - 1);


  const deleteItem = () => {
    props.handleClick(props.id)
  }

  return (
    <tr id={props.id} className={props.class}>
      <td> {props.item}</td>
      <td>
        <div>{'Opções'}</div>
      </td>
      <td>
        <div>{'Adicionais'}</div>

      </td>
      <td>
        <button className={css(styles.decreaseBtn)} onClick={decreaseQuantity}>
          -
        </button>
        <button className={css(styles.quantifier)}>
          {quantity}
        </button>
        <button className={css(styles.increaseBtn)} onClick={increaseQuantity}>
          +
        </button>

      </td>

      <td>{props.price}</td>
      <td>
        <img className={css(styles.deleteImg)}
          onClick={deleteItem}
          src={DeleteImg}
          alt="Delete" />
      </td>
    </tr >
  )
}
export default OrderTableRow


const styles = StyleSheet.create({
  decreaseBtn: {
    backgroundColor: 'tomato',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    width: '25px',
    height: '25px'
  },
  deleteImg: {
    width: '25px',
    height: '25px'
  },
  increaseBtn: {
    backgroundColor: '#37AE60',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    width: '25px',
    height: '25px'
  },
  quantifier: {
    border: 'none',
    width: '25px',
    height: '25px'
  }
})