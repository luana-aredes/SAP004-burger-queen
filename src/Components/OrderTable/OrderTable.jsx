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
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 768px)': {
      width: '30%',
      height: '30%',
    },
    '@media (min-width: 1025px)': {
      width: '35px',
      height: '35px',
    },
  },
  deleteImg: {
    width: '30px',
    height: '30px',
    '@media (min-width: 350px)': {
      width: '15px',
      height: '15px',
    },
    '@media (min-width: 768px)': {
      width: '33px',
      height: '33px',
    },
    '@media (min-width: 1025px)': {
      width: '30px',
      height: '30px',
    },
  },
  increaseBtn: {
    backgroundColor: '#37AE60',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.0em',
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
    },
    '@media (min-width: 768px)': {
      width: '30%',
      height: '30%',
    },
    '@media (min-width: 1025px)': {
      width: '35px',
      height: '35px',
    },
  },
  quantifier: {
    border: 'none',
    '@media (min-width: 350px)': {
      width: '20px',
      height: '20px',
      fontSize: '1em',
    },
    '@media (min-width: 768px)': {
      fontSize: '1em',
      width: '30%',
      height: '30%',
    },
    '@media (min-width: 1025px)': {
      fontSize: '1em',
      width: '35px',
      height: '35px',
    },
  },
  fontRow: {
    fontSize: '80%',
    '@media (min-width: 1025px)': {
      fontSize: '70%'
    },
  },
  alignCenter: {
    width: '15%',
    textAlign: 'center',
    padding: '10px 0px',
    '@media (min-width: 350px)': {
      fontSize: '1.2em'
    },
    '@media (min-width: 768px)': {
      fontSize: '1.8em',
    },
    '@media (min-width: 1025px)': {
      padding: '4px',
    },
  },
  alignLeft: {
    textAlign: 'left',
    width: '15%',
    padding: '10px 5px',
    '@media (min-width: 350px)': {
      fontSize: '1.2em'
    },
    '@media (min-width: 768px)': {
      fontSize: '1.8em',
    },
    '@media (min-width: 1025px)': {
      padding: '4px',
    },
  },
  block: {
    display: 'block',
    '@media (min-width: 350px)': {
      fontSize: '0.8em'
    },
    '@media (min-width: 768px)': {
      fontSize: '0.9em',
    },
  },
  statusRequestMessage: {
    color: 'blue',
    fontSize: '1.4em'
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
    '@media (min-width: 1025px)': {
      width: '150px',
      marginRight: '60px'

    }

  },
  scroll: {
    margin: '0px auto',
    height: '480px',
    paddingLeft: '8px',
    overflowY: 'scroll',
    '@media (min-width: 350px)': {
      width: '350px',
      height: '200px'
    },
    '@media (min-width: 768px)': {
      width: '580px',
    },
    '@media (min-width: 1025px)': {
      height: '200px',
      width: '760px'
    },
  },
  tableColumn: {
    padding: '8px',
    width: '15%',
    '@media (min-width: 350px)': {
      fontSize: '0.6em',
      padding: '2px'
    },
    '@media (min-width: 768px)': {
      fontSize: '0.9em',
      padding: '0px'
    },
    '@media (min-width: 1025px)': {
      fontSize: '1em',
      width: '15%',
    },
  },
  productColumn: {
    padding: '7px',
    textAlign: 'left'
  },
  thead: {
    fontSize: '1.4em',
    '@media (min-width: 1025px)': {
      fontSize: '1.3em'
    },
  },
  inputSize: {
    width: '20px',
    height: '20px',
    '@media (min-width: 350px)': {
      marginBottom: '0px',
      width: '10px',
      height: '10px',
    },
    '@media (min-width: 768px)': {
      width: '20px',
      height: '20px',
      marginBottom: '20px',
    },
    '@media (min-width: 1025px)': {
      marginBottom: '20px'
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
    includingAdditionalValue(doc)

  }

  const includingAdditionalValue = (doc) => {
    if (doc.clientAddChoice) {
      doc.additionalPrice = parseInt(doc.clientAddChoice.length)
      doc.totalPriceItem = ((doc.additionalPrice + parseFloat(doc.price)) * doc.quantity).toFixed(2);
    } else {
      doc.totalPriceItem = (parseFloat(doc.price) * doc.quantity).toFixed(2);
    }
    let summedPrice = 0
    summedPrice += parseFloat(doc.totalPriceItem);
    setTotalPrice(summedPrice)
  }

  const AdditionalBurguer = (doc, list) => {
    if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
      return (
        doc.additional.map((adc, index) => {
          return (
            <span key={index} className={css(styles.block)}>
              <label className={css(styles.optionsBurguer)}><input className={css(styles.inputSize)} type="checkbox" value={adc} name={adc}
                onClick={e => { saveAdc(e, adc, doc, list, index) }}
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
    product.quantity > 1 ? product.quantity -= 1 : product.quantity = 1;
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
  const SentDataSucessMessage = () => {
    setSendStatus('PEDIDO ENVIADO PARA A COZINHA!')
    setTimeout(() => setSendStatus(''), 2000)
  };

  const sendRequestToDataBase = (itemsList) => {
    setSendStatus('REGISTRANDO PEDIDO. AGUARDE...');
    db.collection('requests').add({ itemsList })
      .then(() => {
        SentDataSucessMessage()
        props.setRequest([])
        props.cleanClientInfos()
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
            <th className={css(styles.productColumn, styles.tableColumn)}>Produtos</th>
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
                  <td className={css(styles.alignLeft)} > {AdditionalBurguer(doc)} </td>
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