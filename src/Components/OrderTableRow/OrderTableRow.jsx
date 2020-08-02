import React, { useState } from 'react'
import Options from '../InputOptions/Options'
import Additional from '../InputAdditional/Additional'
import { StyleSheet, css } from 'aphrodite';
import DeleteImg from '../../assets/trash.png'


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

const OrderTableRow = (props) => {

	const list = props.requestList;

	const deleteItemOnOrder = (productIndex) => list.splice(productIndex, 1);

	const increaseQuantityOfItem = (index) => {
		list[index].quantity += 1;
		totalPrice(index)
	};

	const decreaseQuantityOfItem = (index) => {
		list[index].quantity > 0 ? list[index].quantity -= 1 : list[index].quantity = 0
		totalPrice(index)
	};

	const totalPrice = (index) => {
		const product = list[index]
		product.totalPrice = (parseFloat(product.price) * product.quantity).toFixed(2)
		console.log(list[index])
	}

	const temHamburguer = (parm) => {
		if (props.item === 'Hamburguer simples' || props.item === 'Hamburguer duplo') {
			if (parm === 'option') {
				return <Options />
			} else { return <Additional /> }
		}
	}

	return list.map((doc, index) => {
		return (
			<tr className={props.class} id={index}>
				<td> {doc.item}</td>
				<td> {temHamburguer('option')}</td>
				<td> {temHamburguer('additional')}</td>
				<td>
					<button className={css(styles.decreaseBtn)} onClick={() => decreaseQuantityOfItem(index)}>
						-
     		  </button>
					<button className={css(styles.quantifier)}>
						{doc.quantity}
					</button>
					<button className={css(styles.increaseBtn)} onClick={() => increaseQuantityOfItem(index)}>
						+
       		 </button>
				</td>
				<td>
					R${doc.totalPrice}
				</td>

				<td>
					<img className={css(styles.deleteImg)}
						onClick={() => deleteItemOnOrder(index)}
						src={DeleteImg}
						alt="Delete" />
				</td>
			</tr>
		)

	})
}

export default OrderTableRow;
