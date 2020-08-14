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
    fontSize: '1.0em',
    width: '35px',
    height: '35px',
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 1024px)': {
      width: '25px',
      height: '25px'
    },
  },
  deleteImg: {
    width: '35px',
    height: '35px',
    '@media (min-width: 350px)': {
      width: '15px',
      height: '15px',
    },
    '@media (min-width: 1024px)': {
      width: '25px',
      height: '25px'
    },
  },
  increaseBtn: {
    backgroundColor: '#37AE60',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.0em',
    width: '35px',
    height: '35px',
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 1024px)': {
      width: '25px',
      height: '25px'
    },
  },
  quantifier: {
    border: 'none',
    width: '35px',
    height: '35px',
    fontSize: '1.0em',
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 1024px)': {
      width: '25px',
      height: '25px'
    },
  },
  fontRow: {
    fontSize: '80%',
    '@media (min-width: 1024px)': {
      fontSize: '70%'
    },
  },
  alignCenter: {
    textAlign: 'center',
    fontSize: '1.6em',
    padding: '10px 0px',
    '@media (min-width: 350px)': {
      fontSize: '0.5em'
    },
    '@media (min-width: 1024px)': {
      padding: '4px',
      fontSize: '1.4em',
      width: '15%'
    },
  },
  alignLeft: {
    textAlign: 'left',
    fontSize: '1.4em',
    padding: '10px 5px',
    '@media (min-width: 350px)': {
      fontSize: '0.8em'
    },
    '@media (min-width: 1024px)': {
      padding: '4px'
    },
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendDataBtn: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '7px 10px',
    marginRight: '15px',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  scroll: {
    height: '480px',
    overflowY: 'scroll',
    '@media (min-width: 350px)': {
      width: '350px',
      height: '200px'

    },
    '@media (min-width: 1028px)': {

    },
    '@media (min-width: 768px)': {
      width: '580px',
    },
    '@media (min-width: 1025px)': {
      height: '200px',
      width: '580px',
    },
  },
  tableColumn: {
    padding: '8px',
    width: '15%',
    '@media (min-width: 350px)': {
      fontSize: '0.6em',
      padding: '2px'
    },
    '@media (min-width: 1025px)': {
      width: '15%'
    },
  },
  thead: {
    fontSize: '1.4em',
    '@media (min-width: 1024px)': {
      fontSize: '1.0em'
    },
  },
  inputSize: {
    width: '20px',
    height: '20px',
    marginBottom: '20px',
    '@media (min-width: 350px)': {
      marginBottom: '0px',
      width: '10px',
      height: '10px',
    },
    '@media (min-width: 1024px)': {
      marginBottom: '5px'
    },
  },
  optionsBurguer: {
    display: 'flex'
  },
})
const OrderTable = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [sendStatus, setSendStatus] = useState('');
  const [meatChoice, setMeatChoice] = useState('');
  const [requestList, setRequestList] = useState();

  useEffect(() => {
    getData()
  })

  useEffect(() => {
    sumPriceOfItems(props.request)
  }, [props.request.length])

  const getData = () => setRequestList(props.request)

  const deleteItemOnOrder = (itemsList, productIndex) => setRequestList(itemsList.splice(productIndex, 1));

  const Options = (doc) => {
    if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
      return (
        doc.meatOption.map((opt, index) => {
          return (
            <span key={index} className={css(styles.block)}>
              <label className={css(styles.optionsBurguer)}><input className={css(styles.inputSize)} type="radio" value={opt}
                onClick={(e) => {
                  setMeatChoice(opt)
                  doc.clientMeatChoice = e.target.value
                }} checked={opt === meatChoice}
              />{opt}</label>
            </span>
          )
        })
      )
    }
  };
  const saveAdc = (e, adc, doc) => {
    const newAdc = e.currentTarget.value;
    if (doc.clientAddChoice) {
      doc.clientAddChoice.includes(newAdc) ?
        doc.clientAddChoice.splice(doc.clientAddChoice.indexOf(adc), 1) :
        doc.clientAddChoice.push(newAdc)
    } else {
      doc.clientAddChoice = [newAdc]
    }
  }

  const AdditionalBurguer = (doc) => {
    if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
      return (
        doc.additional.map((adc, index) => {
          return (
            <span key={index} className={css(styles.block)}>
              <label className={css(styles.optionsBurguer)}><input className={css(styles.inputSize)} type="checkbox" value={adc} name={adc}
                onClick={e => { saveAdc(e, adc, doc) }}
                checked={null}
              />{adc}</label>
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
    if (product.clientAddChoice) {
      product.additionalPrice = parseInt(product.clientAddChoice.length)
      product.totalPriceItem = ((product.additionalPrice + parseFloat(product.price)) * product.quantity);
    } else {
      product.totalPriceItem = (parseFloat(product.price) * product.quantity).toFixed(2);
    }
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
    addInfosClient(itemsList);
  };

  const sendRequestToDataBase = (itemsList) => {
    setSendStatus('Registrando pedido. Aguarde...');
    db.collection('requests').add({ itemsList })
      .then((doc) => {
        setSendStatus('Pedido enviado para a cozinha!')
        props.setRequest([])
      })
      .catch(() => setSendStatus('Erro ao registrar pedido. Tente novamente!'))
  };

  const addInfosClient = (itemsList) => {
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

  const list = props.request
  return (
    <table >
      <div className={css(styles.scroll)}>
        <thead className={css(styles.thead)}>
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
          {
            list.map((doc, index) => {
              return (
                <tr className={css(styles.fontRow)} >
                  <td className={css(styles.alignLeft)} > {doc.item} </td>
                  <td className={css(styles.alignLeft)} > {Options(doc, index)} </td>
                  <td className={css(styles.alignLeft)} > {AdditionalBurguer(doc, index)} </td>
                  <td className={css(styles.alignCenter)} >
                    <button
                      className={css(styles.decreaseBtn)}
                      onClick={() => decreaseQuantityOfItem(list, index)} >
                      -
                    </button>
                    <button className={css(styles.quantifier)} >
                      {doc.quantity}
                    </button>
                    <button className={css(styles.increaseBtn)}
                      onClick={() => increaseQuantityOfItem(list, index)} >
                      +
                    </button>
                  </td>
                  <td className={css(styles.alignCenter)} >
                    <div className={css(styles.block)}>
                      <div>R$</div>
                      <div> {doc.totalPriceItem}</div>
                    </div>
                  </td>
                  <td className={css(styles.alignCenter)} >
                    <img className={css(styles.deleteImg)}
                      onClick={() => deleteItemOnOrder(list, index)}
                      src={DeleteImg}
                      alt="Delete" />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </div>
      <tfoot  >
        <div className={css(styles.totalPrice)}>
          <td>
            TOTAL R$ {totalPrice.toFixed(2)}
          </td>
          <td>
            <button
              className={css(styles.sendDataBtn)}
              onClick={() => validateAndSendRequest(list)} >
              Enviar
					</button>
          </td>
        </div>
      </tfoot>
      <p className={css(styles.statusRequestMessage)} >
        {sendStatus}
      </p>
    </table>
  )
};

export default OrderTable;



