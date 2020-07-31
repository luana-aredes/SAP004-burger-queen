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

	const deleteItem = () => props.handleClickDelBtn(props.id);
	const increaseQuantityOfItem = () => props.handleClickIncreaseBtn(props.id);
	const decreaseQuantityOfItem = () => props.handleClickDecreaseBtn(props.id);

	const temHamburguer = (parm) => {
		if (props.item === 'Hamburguer simples' || props.item === 'Hamburguer duplo') {
			if (parm === 'option') {
				return <Options />
			} else { return <Additional /> }
		}
	}

	return list.map(doc => {
		return (
			<tr className={props.class}>
				<td> {doc.item}</td>
				<td> {temHamburguer('option')}</td>
				<td> {temHamburguer('additional')}</td>
				<td>
					<button className={css(styles.decreaseBtn)}>
						-
        </button>
					<button className={css(styles.quantifier)}>
						{doc.quantity}
					</button>
					<button className={css(styles.increaseBtn)} >
						+
        </button>

				</td>

				<td>{doc.price}</td>
				<td>
					<img className={css(styles.deleteImg)}
						src={DeleteImg}
						alt="Delete" />
				</td>
			</tr >
		)

	})
}

export default OrderTableRow;
