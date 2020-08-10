import React, { useState } from 'react';
import { db } from '../../config/firebase';
import Card from '../../Components/OrderCard/Card';
import Header from '../../Components/Header/Header';
import { StyleSheet, css } from 'aphrodite';
import mock from './mock'
import { useEffect } from 'react';

const styles = StyleSheet.create({
  cardsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
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
    width: '35px',
    height: '35px',
  },
  styleBtn: {
    backgroundColor: '#37AE60',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    padding: '7px',
    marginTop: '15px',
  },
});

const Kitchen = () => {
  const [user, setUser] = useState(null)
  const [request, setRequest] = useState([])
  const [requestID, setRequestID] = useState([])

  //   React.useEffect(() => {
  //     const request = async () => {
  //       try {
  //         const data = await db.collection('requests').get();
  //         const arrayData = data.docs.map(doc => (doc.data()));
  //         setRequest(arrayData)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     request()
  //   }, [request])

  //---------------

  //mock doc.id

  //mock
  useEffect(() => {
    getRequest()
    getRequestID()
  }, [])

  const getRequestID = () => {
    const idList = ['ABC123', 'ERT587', 'POI87'];
    setRequestID(idList)
    console.log('Lista de ids', requestID)
  }

  const getRequest = () => {
    setRequest(mock)
    console.log('Lista de pedidos', request)
  }



  //---------------

  const sendToReadyRequestList = (readyRequest) => {
    //tratamento de then e catch
    db.collection('ready-requests').add(readyRequest)
  };

  const sendToHistoryOfRequests = (readyRequest) => {
    //tratamento de then e catch
    db.collection('history-request').add(readyRequest)
  };

  const deleteReadyRequest = id => {
    db.collection('requests').doc(id).delete();
  }

  const handleReadyRequest = (indexRequest, id) => {
    const readyRequest = request[indexRequest];
    sendToReadyRequestList(readyRequest)
    sendToHistoryOfRequests(readyRequest)
    // deleteReadyRequest(id)

    //Excluir da tela (precisa?)
    // setRequest(request.splice(indexRequest, 1))
  }

  return (
    <>
      <Header place={'kitchen'} />
      <main>
        <div className={css(styles.titleBox)} >
          <img
            src={require('../../assets/clock.png')}
            alt='Timer'
            className={css(styles.clock)} />
          <h2>
            Pedidos Pendentes
          </h2>
        </div>
        <div className={css(styles.cardsBox)}>
          <Card request={request}
            name={"Pedido Pronto"}
            handleReadyRequest={handleReadyRequest}
            classBtn={css(styles.styleBtn)}
          />
        </div>
      </main>
    </>
  )
}

export default Kitchen

