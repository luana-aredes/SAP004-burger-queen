import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../config/firebase';
import Card from '../../Components/OrderCard/Card';
import Header from '../../Components/Header/Header';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

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

//---------------
const Kitchen = () => {
  const [request, setRequest] = useState([])

  //Função que estava presente quando o firebase esgotou a cota
  // React.useEffect(() => {
  //   const request = async () => {
  //     try {
  //       const data = await db.collection('requests').get();
  //       const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //       setRequest(arrayData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   request()
  // }, [])


  React.useEffect(() => {
    const request = async () => {
      try {
        db.collection('requests').onSnapshot((snapshot) => {
          console.log(snapshot)
          const arrayData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setRequest(arrayData)
        })
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])



  // const getDiffTime = (doc) => {
  //   console.log(doc.itemsList[0].time)
  //   const horarioAtual = doc.itemsList[0].time
  //   const horarioFinal = new Date().toLocaleTimeString()
  //   const diffTime = ''
  //   //manipulação essa diff
  //   // var dtChegada = "16:40";
  //   // var dtPartida = "11:20";

  //   var ms = moment(horarioFinal, "HH:mm").diff(moment(horarioAtual, "HH:mm"));
  //   var d = moment.duration(ms);
  //   var s = Math.floor(d.asHours()) + "h" + moment.utc(ms).format(" mm") + "m";
  //   console.log(s);
  //   //request.duration = diffTime
  // }

  const sendToReadyRequestList = readyRequest => db.collection('ready-requests').add(readyRequest);

  const sendToHistoryOfRequests = readyRequest => db.collection('history-request').add(readyRequest);

  const deleteReadyRequest = id => db.collection('requests').doc(id).delete();

  const handleReadyRequest = (id, indexRequest, doc) => {
    //getDiffTime(doc)
    const readyRequest = request[indexRequest];
    sendToReadyRequestList(readyRequest)
    sendToHistoryOfRequests(readyRequest)
    deleteReadyRequest(id)
    setRequest(request.filter((item) => {
      return item.id !== id
    }))
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
            place='kitchen'
            handleReadyRequest={handleReadyRequest}
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

export default Kitchen

