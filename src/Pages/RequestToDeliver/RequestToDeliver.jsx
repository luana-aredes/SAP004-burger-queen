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
  },
  title: {
    '@media (max-width: 500px)': {
      fontSize: '1.4em'
    }
  }
});

const RequestToDeliver = () => {
  const [readyRequest, setReadyRequest] = useState([])

  //Função que estava presente quando o firebase esgotou a cota

  //   React.useEffect(() => {
  //     const request = async () => {
  //       try {
  //         const data = await db.collection('ready-requests').get();
  //         const arrayData = data.docs.map(doc => doc.data());
  //         setReadyRequest(arrayData)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     request()
  //   }, [setReadyRequest])


  useEffect(() => {
    getRequest()
  }, [readyRequest]);

  const getRequest = () => {
    setReadyRequest(mock)
  }

  return (
    <>
      <Header />
      <main>
        <div className={css(styles.titleBox)} >
          <img
            src={require('../../assets/tick.png')}
            alt='Timer'
            className={css(styles.clock)} />
          <h1 className={css(styles.title)}>
            Pedidos Prontos
          </h1>
        </div>
        <div className={css(styles.cardsBox)}>
          <Card request={readyRequest}
            name={"Pedido Entregue"}
            classBtn={css(styles.styleBtn)}
            classInputCheck={css(styles.inputCheck)}
            classImgCheck={css(styles.none)}
            classInputCheckItem={css(styles.checkItem)}
          />
        </div>
      </main>
    </>
  )
}

export default RequestToDeliver;





