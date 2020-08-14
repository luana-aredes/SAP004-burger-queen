import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import Header from '../../Components/Header/Header';
import Card from '../../Components/OrderCard/Card'
import { StyleSheet, css } from 'aphrodite';
import History from '../../assets/history.png';
import ReadyOrders from './mock'

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  historyImg: {
    width: "36px",
    height: "40px"
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    width: '95%',
    margin: 'auto',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 500px)': {
      fontSize: '1.4em'
    }
  },
  imgCheck: {
    width: '40px',
    height: '40px',
    marginTop: '12px'
  },
})


const RequestHistory = (props) => {

  const [readyOrders, setReadyOrders] = useState([])

  //Função que estava presente quando o firebase esgotou a cota
  // React.useEffect(() => {
  //   const readyOrders = async () => {
  //     try {
  //       const data = await db.collection('history-request').get()
  //       const arrayData = data.docs.map(doc => (doc.data()))
  //       setReadyOrders(arrayData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   readyOrders()
  // }, [])


  //Função que estava presente quando o firebase esgotou a cota
  useEffect(() => {
    const readyOrders = async() => {
      try {
        db.collection('history-request').onSnapshot((snapshot) => {
          console.log(snapshot)
          const arrayData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setReadyOrders(arrayData)
          console.log(readyOrders)
        })
      } catch (error) {
        console.log(error)
      }
    }
    readyOrders()
  }, [])


  return ( <
    >
    <
    Header place = 'kitchen' / >
    <
    main >
    <
    h1 className = { css(styles.title) } >
    <
    img src = { History }
    alt = "History"
    className = { css(styles.historyImg) }
    />  Histórico de Pedidos Prontos < /
    h1 > <
    div className = { css(styles.main) } >
    <
    Card request = { readyOrders }
    classBtn = { css(styles.none) }
    classImgCheck = { css(styles.imgCheck) }
    /> < /
    div > <
    /main> < /
    >
  )
}

export default RequestHistory