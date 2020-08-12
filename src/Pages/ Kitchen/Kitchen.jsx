import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import Card from '../../Components/OrderCard/Card';
import Header from '../../Components/Header/Header';
import { StyleSheet, css } from 'aphrodite';
import mock from './mock'

const styles = StyleSheet.create({
  cardsBox: {
    display: 'flex',
    width: '95%',
    margin: 'auto',
    overflowY: 'scroll',
    flexWrap: 'wrap',
    '@media (max-width: 550px)': {
      flexDirection: 'column'
    },
  },
  clock: {
    width: '35px',
    height: '35px',
    marginRight: '15px'
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputCheck: {
    width: '30px',
    height: '30px',
  },
  styleBtn: {
    backgroundColor: '#37AE60',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    padding: '10px',
    marginTop: '12px',
    marginBottom: '12px',
    fontSize: '1.2em',
    ":hover": {
      backgroundColor: '#29924D',
      transition: "0.4s"
    }
  },
  none: {
    display: 'none'
  },
  checkItem: {
    width: '23px',
    height: '23px',
    marginRight: '10px'
  },
  title: {
    '@media (max-width: 500px)': {
      fontSize: '1.4em'
    }
  }
});

const Kitchen = () => {
  const [request, setRequest] = useState([])

  //Função que estava presente quando o firebase esgotou a cota

  //   React.useEffect(() => {
  //     const request = async () => {
  //       try {
  //         const data = await db.collection('requests').get();
  //          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //         setRequest(arrayData)
  //         setRequestID(arrayDocId)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     request()
  //   }, [request])


  //usando Mock como bd
  useEffect(() => {
    getRequest()
    console.log('estou dentro do useEffect', request)
  }, [request]);

  //Função para pegar banco de dados
  const getRequest = () => {
    setRequest(mock)
    console.log('estou fora do useEffect', request)
  }

  //---------------

  const sendToReadyRequestList = readyRequest => {
    //tratamento de then e catch
    db.collection('ready-requests').add(readyRequest)
  };

  const sendToHistoryOfRequests = readyRequest => {
    //tratamento de then e catch
    db.collection('history-request').add(readyRequest)
  };

  const deleteReadyRequest = requestID => {
    db.collection('requests').doc(requestID).delete();
  }

  const handleReadyRequest = (indexRequest, idRequest) => {
    console.log(indexRequest, idRequest)
    // const readyRequest = request[indexRequest];
    // sendToReadyRequestList(readyRequest)
    // sendToHistoryOfRequests(readyRequest)
    // deleteReadyRequest(idRequest)

    //Excluir da tela (precisa?)
    setRequest(request.splice(indexRequest, 1))
  };

  return (
    <>
      <Header place={'kitchen'} />
      <main>
        <div className={css(styles.titleBox)} >
          <img
            src={require('../../assets/clock.png')}
            alt='Timer'
            className={css(styles.clock)} />
          <h1 className={css(styles.title)}>
            Pedidos Pendentes
          </h1>
        </div>
        <div className={css(styles.cardsBox)}>
          <Card request={request}
            name={"Pedido Pronto"}
            handleReadyRequest={handleReadyRequest}
            classBtn={css(styles.styleBtn)}
            classInputCheck={css(styles.inputCheck)}
            classImgCheck={css(styles.none)}
            classInputCheckItem={css(styles.checkItem)}
            place='kitchen'
          />
        </div>
      </main>
    </>
  )
}

export default Kitchen

