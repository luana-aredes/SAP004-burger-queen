import React, { useState, useEffect } from 'react'
import Options from '../InputOptions/Options'
import Additional from '../InputAdditional/Additional'
import { StyleSheet, css } from 'aphrodite';
import DeleteImg from '../../assets/trash.png'
import { db } from '../../config/firebase'


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
	},
	statusRequestMessage: {
		color: 'blue',
	},
	totalPrice: {
		fontWeight: 'bold',
		marginTop: '20px',
		fontSize: '1.2em',
	},
	sendDataBtn: {
		backgroundColor: 'green',
		color: 'white',
		border: 'none',
		padding: '5px 10px',
		marginLeft: '30px',
		fontWeight: 'bold',
	}
})

const OrderTableRow = (props) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [sendStatus, setSendStatus] = useState('');

	const deleteItemOnOrder = (data, productIndex) => data.splice(productIndex, 1);

	const increaseQuantityOfItem = (data, productIndex) => {
		data[productIndex].quantity += 1;
		totalPriceOfItem(data, productIndex);
	};

	const decreaseQuantityOfItem = (data, productIndex) => {
		const product = data[productIndex]
		product.quantity > 0 ? product.quantity -= 1 : product.quantity = 0;
		totalPriceOfItem(data, productIndex);
	};

	const totalPriceOfItem = (data, productIndex) => {
		const product = data[productIndex];
		product.totalPriceItem = (parseFloat(product.price) * product.quantity).toFixed(2);
	}

	const sumPriceOfItems = (itemsList) => {
		let summedPrice = 0
		itemsList.map(item => summedPrice += parseFloat(item.totalPriceItem));
		setTotalPrice(summedPrice)
		console.log('O preço total do pedido é', summedPrice)
	};

	const addTimeStamp = () => new Date().toLocaleTimeString();

	const validateData = (data) => {
		data.map(item => {
			console.log(data.clientName)
		})
	}

	const sendRequestToDataBase = (itemsList) => {
		sumPriceOfItems(itemsList);
		validateData(itemsList);
		console.log(itemsList);
		// setSendStatus('Registrando pedido. Aguarde...');
		// db.collection('requests').add({
		// 	time: addTimeStamp(), ...itemsList
		// })
		// 	.then(() => setSendStatus('Pedido enviado para a cozinha!'))
		// 	.catch(() => setSendStatus('Erro ao registrar pedido. Tente novamente!'))
	};



	const temHamburguer = (parm) => {
		if (props.item === 'Hamburguer simples' || props.item === 'Hamburguer duplo') {
			if (parm === 'option') {
				return <Options />
			} else { return <Additional /> }
		}
	}

	return (
		<section>
			<div>
				{props.requestList.map((doc, index) => {
					return (
						<tr className={props.class} id={index}>
							<td> {doc.item}</td>
							<td> {temHamburguer('option')}</td>
							<td> {temHamburguer('additional')}</td>
							<td>
								<button className={css(styles.decreaseBtn)} onClick={() => decreaseQuantityOfItem(props.requestList, index)}>
									-
     		  </button>
								<button className={css(styles.quantifier)}>
									{doc.quantity}
								</button>
								<button className={css(styles.increaseBtn)} onClick={() => increaseQuantityOfItem(props.requestList, index)}>
									+
       		 </button>
							</td>
							<td>
								R${doc.totalPriceItem}
							</td>

							<td>
								<img className={css(styles.deleteImg)}
									onClick={() => deleteItemOnOrder(props.requestList, index)}
									src={DeleteImg}
									alt="Delete" />
							</td>
						</tr>
					)
				})}
			</div>

			<div className={css(styles.totalPrice)}>
				<tfoot>
					<td>
						TOTAL R${totalPrice.toFixed(2)}
					</td>
					<td>
						<button
							className={css(styles.sendDataBtn)}
							onClick={() => sendRequestToDataBase(props.requestList)}>
							Enviar
       		</button>
					</td>
				</tfoot>
				<p className={css(styles.statusRequestMessage)}>
					{sendStatus}
				</p>
			</div>
		</section>
	)
}

export default OrderTableRow;
