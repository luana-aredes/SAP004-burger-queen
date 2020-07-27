import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db, auth } from '../../config/firebase';
import Button from '../../Components/Button/Button';
import MenuBtn from '../../Components/MenuBtn/MenuBtn';
import Comanda from '../../Components/Comanda/Comanda';
import Header from '../../Components/Header/Header';

const styles = StyleSheet.create({
  btnMenu: {
    backgroundColor: '#F3E3CC',
    margin: '6px',
    padding: '6px',
    display: 'block',
    width: '300px',
    height: '40px'
  },
  name: {
    color: 'red'
  },
  price: {
    color: 'blue'
  }
})

const Saloon = (props) => {
  const [coffee, setCoffee] = useState([])
  const [allDay, setAllDay] = useState([])
  const [button, setButton] = useState(true)
  const [request, setRequest] = useState([])
  const [error, setError] = useState(null)

  React.useEffect(() => {
    const coffeeMenu = async () => {
      try {
        const data = await db.collection('coffee-menu').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCoffee(arrayData)
      } catch (error) {
        console.log(error)
      }
    }

    const allDayMenu = async () => {
      try {
        const data = await db.collection('all-day-menu').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setAllDay(arrayData)
      } catch (error) {
        console.log(error)
      }
    }

    allDayMenu()
    coffeeMenu()
  }, [button, error, coffee, allDay])


  return (<
    main >
    <
    header >
      <
        Header />
      <
    /header> <
    section >
        <
          Button name="Café da manhã"
          value='coffee'
          handleCLick={
            () => {
              setButton((true))
            }
          }

        /> <
          Button name="Dia"
          value='day'
          handleCLick={
            () => {
              setButton((false))
            }
          }
        /> < /
    section > <
    section > {
            button ?
              (
                coffee.map(item => (<
                  MenuBtn name={`${item.item} `}
                  price={`R$${item.price}`}
                  class={css(styles.btnMenu)}
                  className={css(styles.name)}
                  classPrice={css(styles.price)}
                  value={item.id}
                  handleCLick={
                    e => {
                      setRequest(e.target.value)
                      console.log(e.target.value)
                    }
                  }
                />
                ))
              ) :
              (
                allDay.map(item => (<
                  MenuBtn name={`${item.item} `}
                  price={`R$${item.price}`}
                  class={css(styles.btnMenu)}
                  value={item.id}
                  handleCLick={
                    e => {
                      setRequest(e.target.value)
                      console.log(e.target.value)
                    }
                  }
                />
                ))
              )
          } <
    /section>

    <
    section >
            <
              Comanda />
            <
    table >
              <
    thead >
                <
    tr >
                  <
    th > Produtos < /th> <
    th > Opções < /th> <
    th > Adicional < /th> <
    th > Quantidade < /th> < /
    tr > <
    /thead> <
    tbody > {<
      tr >
                              <
      td > < /td> <
      td > < /td> <
      td > < /td> <
      td > < /td> < /
      tr >

    }

    <
    /tbody> < /
    table > <
    /section>

    <
    /main>

  )
}

export default Saloon;