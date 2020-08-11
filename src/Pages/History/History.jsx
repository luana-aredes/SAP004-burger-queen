import React, { useState } from 'react';
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
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
})



const RequestHistory = (props) => {

  const [readyOrders, setReadyOrders] = useState([])

  {/*

      //mock usado quando esgota a cota do firebase

  React.useEffect(() => {
    setReadyOrders(ReadyOrders)
  }, [readyOrders])
*/}


  //Função que estava presente quando o firebase esgotou a cota
  React.useEffect(() => {
    const readyOrders = async () => {
      try {
        const data = await db.collection('history-request').get()
        const arrayData = data.docs.map(doc => (doc.data()))
        setReadyOrders(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    readyOrders()
  }, [readyOrders])



  return (
    <>
      <Header place='kitchen' />
      <main >
        <h1 className={css(styles.title)}> <img src={History} alt="History" className={css(styles.historyImg)} />  Histórico de Pedidos Prontos</h1>
        <div className={css(styles.main)}>
          <Card
            request={readyOrders}
            classBtn={css(styles.none)}
            classInputCheck={css(styles.none)}
            classInputCheckItem={css(styles.none)}
          />
        </div>

      </main>
    </>
  )
}

export default RequestHistory

