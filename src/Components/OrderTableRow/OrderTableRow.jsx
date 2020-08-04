import React, { useState, useEffect } from 'react'
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
	fontRow: {
		fontSize: '80%'
	},
	columnWidth: {
		width: '16%'
	},
	block: {
		display: 'block'
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
		padding: '7px 10px',
		marginLeft: '30px',
		fontWeight: 'bold',
		fontSize: '1.1em',

	}
})
const OrderTableRow = (props) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [sendStatus, setSendStatus] = useState('');

	useEffect(() => {
		sumPriceOfItems(props.requestList)
	}, [props.requestList.length])

	const deleteItemOnOrder = (itemsList, productIndex) => itemsList.splice(productIndex, 1);

	const [option, setOption] = React.useState('')
	const [additional, setAdditional] = React.useState([])

	const Options = (doc) => {
		if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
			return (
				doc.meatOption.map((opt, index) => {
					return (
						<span key={index}
							className={css(styles.block)} >
							<label > < input type="radio"
								value={opt}
								name={opt}
								onChange={
									() => {
										setOption(opt)
										console.log(opt)
									}
								}
								checked={opt === option}
							/>{opt}</label >
						</span>

					)
				})
			)

		}
	}

	const saveAdc = (e, adc) => {
		const newAdc = e.currentTarget.value
		console.log(e.currentTarget.value)
		if (!additional.includes(newAdc) && additional !== []) {
			setAdditional([...additional, newAdc])
			console.log(additional)
		} else if (additional.includes(newAdc)) {
			console.log(additional)
			additional.splice(additional.indexOf(adc), 1)
			console.log(additional)
		}

	}
	const AdditionalBurguer = (doc) => {
		if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
			return (
				doc.additional.map((adc, index) => {
					return (
						<span key={index}
							className={css(styles.block)} >
							<label >
								<input type="checkbox"
									value={adc}
									name={adc}
									onClick={e => saveAdc(e, adc)}
									checked={null}
								/>
								{adc}
							</label>
						</span>

					)
				})
			)
		}
	}

	const increaseQuantityOfItem = (itemsList, productIndex) => {
		itemsList[productIndex].quantity += 1;
		totalPriceOfItem(itemsList, productIndex);
		sumPriceOfItems(itemsList)
	};

	const decreaseQuantityOfItem = (itemsList, productIndex) => {
		const product = itemsList[productIndex]
		product.quantity > 0 ? product.quantity -= 1 : product.quantity = 0;
		totalPriceOfItem(itemsList, productIndex);
		sumPriceOfItems(itemsList)
	};

	const totalPriceOfItem = (itemsList, productIndex) => {
		const product = itemsList[productIndex];
		product.totalPriceItem = (parseFloat(product.price) * product.quantity).toFixed(2);
	}

	const sumPriceOfItems = (itemsList) => {
		let summedPrice = 0
		itemsList.map(item => summedPrice += parseFloat(item.totalPriceItem));
		setTotalPrice(summedPrice)
	};

	const addTimeStampToRequest = itemsList => itemsList.map(item => item.time = new Date().toLocaleTimeString());

	const validateAndSendRequest = itemsList => {
		sumPriceOfItems(itemsList);
		addTimeStampToRequest(itemsList);
		addInfosClientAndSendRequest(itemsList)
	};

	const sendRequestToDataBase = (itemsList) => {
		setSendStatus('Registrando pedido. Aguarde...');
		db.collection('requests').add({ itemsList })
			.then(() => setSendStatus('Pedido enviado para a cozinha!'))
			.catch(() => setSendStatus('Erro ao registrar pedido. Tente novamente!'))
	};

	const addInfosClientAndSendRequest = (itemsList) => {
		if (props.clientName !== undefined || props.clientTable !== undefined) {
			itemsList.map(item => {
				item.clientName = props.clientName;
				item.tableNumber = props.clientTable;
			})
			sendRequestToDataBase(itemsList)
		} else {
			alert('Preencha os dados do cliente');
		}
	};

	return (
		<section >
			<div> {
				props.requestList.map((doc, index) => {
					return (
						<tr className={css(styles.fontRow)} >
							<td className={css(styles.columnWidth)} > {doc.item} </td>
							<td className={css(styles.columnWidth)} > {Options(doc, index)} </td>
							<td className={css(styles.columnWidth)} > {AdditionalBurguer(doc, index)} </td>
							<td className={css(styles.columnWidth)} >
								<button className={css(styles.decreaseBtn)}
									onClick={
										() => decreaseQuantityOfItem(props.requestList, index)
									} >
									-
          </button>
								<button className={css(styles.quantifier)} > {doc.quantity}
								</button>
								<button className={css(styles.increaseBtn)}
									onClick={
										() => increaseQuantityOfItem(props.requestList, index)
									} >
									+
          </button>
							</td>
							<td className={css(styles.columnWidth)} >
								R$ {doc.totalPriceItem}
							</td>
							<td className={css(styles.columnWidth)} >
								<img className={css(styles.deleteImg)}
									onClick={
										() => deleteItemOnOrder(props.requestList, index)
									}
									src={DeleteImg}
									alt="Delete" />
							</td> </tr>
					)
				})
			} </div>

			<div className={css(styles.totalPrice)} >
				<tfoot>
					<td>
						TOTAL R$ {totalPrice.toFixed(2)}
					</td>
					<td>
						<button className={css(styles.sendDataBtn)}
							onClick={
								() => validateAndSendRequest(props.requestList)
							} >
							Enviar
						</button>
					</td>
				</tfoot>
				<p className={css(styles.statusRequestMessage)} >
					{sendStatus}
				</p>
			</div>
		</section>
	)
};

export default OrderTableRow;