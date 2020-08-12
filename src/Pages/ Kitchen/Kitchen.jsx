import React, { useState, useEffect, useCallback } from 'react';
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
  },
});

const Kitchen = () => {
  const [user, setUser] = useState(null)
  const [request, setRequest] = useState([])
  const [id, setId] = useState()

  //Função que estava presente quando o firebase esgotou a cota

  React.useEffect(() => {
    const getDataBase = async () => {
      try {
        const data = await db.collection('requests').get();
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequest(arrayData)
        console.log(request)
      } catch (error) {
        console.log(error)
      }
    }
    getDataBase()
  }, [id])

  useEffect(() => {
    setRequest(getDataBase())
  }, [])

  const getDataBase = async () => {
    try {
      const data = await db.collection('requests').get();
      const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return arrayData
    } catch (error) {
      return console.log(error)
    }
  }

  //-----------------
  //Tentando de outra forma:

  // useEffect(() => {
  //   db.collection('requests').get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => setRequest((current) => [...current, id: doc, doc.data()]));
  //     });
  // }, []);
  //------------------------
  //usando Mock como bd

  // useEffect(() => {
  //   getRequest()
  // }, [request]);

  // const getRequest = () => {
  //   setRequest(mock)
  // }

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

  const handleReadyRequest = (indexRequest, id) => {
    // const readyRequest = request[indexRequest];
    // sendToReadyRequestList(readyRequest)
    // sendToHistoryOfRequests(readyRequest)
    // deleteReadyRequest(id)
    //Excluir da tela (precisa?)
    // setRequest(request.splice(indexRequest, 1))
    console.log(request)
    // setRequest(request.splice(indexRequest, 1))
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
          <h1>
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

