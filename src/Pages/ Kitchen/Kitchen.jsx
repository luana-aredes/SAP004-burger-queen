import React, { useState } from 'react';
import { db } from '../../config/firebase';
import Card from '../../Components/OrderCard/Card';
import Header from '../../Components/Header/Header';
import mock from './mock'
import { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  styleBtn: {
    backgroundColor: '#37AE60',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    padding: '7px',
    marginTop: '15px',
  },
  inputCheck: {
    width: '25px',
    height: '25px',
  }
})

const Kitchen = () => {
  const [user, setUser] = useState(null)
  const [request, setRequest] = useState([])

  //Função que estava presente quando o firebase esgotou a cota
  React.useEffect(() => {
    const request = async () => {
      try {
        const data = await db.collection('requests').get()
        const arrayData = data.docs.map(doc => (doc.data()))
        setRequest(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [request])



  //---------------
  //usando Mock como bd

  //useEffect(() => {
  //getRequest()
  //}, [request])

  //const getRequest = () => {
  // setRequest(mock)
  // console.log("Setando lista de pedidos: ", request)
  // }

  //---------------

  const sendToReadyRequestList = (readyRequest) => {
    db.collection('ready-requests').add(readyRequest)
      .then(() => {
        console.log('Pedido enviado para fila de espera', readyRequest)
      })
      .catch((error) => console.log(error))
  };

  const sendToHistoryOfRequests = (readyRequest) => {
    db.collection('history-request').add(readyRequest)
      .then(() => {
        console.log('Pedido enviado para histórico:', readyRequest)
      })
      .catch((error) => console.log(error))
  };


  const handleReadyRequest = (indexRequest, id) => {
    const readyRequest = request[indexRequest];
    sendToReadyRequestList(readyRequest)
    sendToHistoryOfRequests(readyRequest)

    //Função para excluir do banco de dados
    //Precisa do id do pedido
    //   db.collection('requests').doc(id).delete()
    //.then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
    //     console.error("Error removing document: ", error);
    // });

    //Excluir da tela (precisa?)
    setRequest(request.splice(indexRequest, 1))
  }

  return (
    <>
      <Header place={'kitchen'} />
      <main>
        <div>Pedidos Pendentes</div>
        <Card request={request}
          name={"Pedido Pronto"}
          handleReadyRequest={handleReadyRequest}
          classBtn={css(styles.styleBtn)}
          classInputCheck={css(styles.inputCheck)} />
      </main>
    </>
  )
}

export default Kitchen

