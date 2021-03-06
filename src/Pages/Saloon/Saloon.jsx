import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db, auth } from '../../config/firebase';
import MenuBtn from '../../Components/MenuBtn/MenuBtn';
import OrderHeader from '../../Components/OrderHeader/OrderHeader';
import Header from '../../Components/Header/Header';
import OrderTable from '../../Components/OrderTable/OrderTable'

const styles = StyleSheet.create({
  btnMenu: {
    backgroundColor: '#F3E3CC',
    marginTop: '10px',
    width: '100%',
    height: '70px',
    paddingLeft: '20px',
    paddingRight: '20px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    fontSize: '2.2em',
    '@media (max-width: 424px)': {
      fontSize: '1.2em'
    },
    '@media (min-width: 760px)': {
      fontSize: '1.4em'
    },
    '@media (min-width: 1025px)': {
      fontSize: '1.5em',
    }
  },
  btnMenuBackground: {
    backgroundColor: '#EFDFDF',
  },
  btnAllDayAndCoffee: {
    width: '49%',
    height: '50px',
    marginBottom: '8px',
    fontSize: '0.9em',
    '@media (min-width: 760px)': {
      fontSize: '0.7em'
    },
    '@media (min-width: 1025px)': {
      fontSize: '1.3em',
    },
    fontWeight: 'bold'
  },
  btnDayBackground: {
    backgroundColor: '#E5B163',
  },
  btnCoffeeBackground: {
    backgroundColor: '#C3846D',
  },
  displayInline: {
    display: 'inline',
  },
  sectionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',

  },
  containerMenu: {
    '@media (min-width: 350px)': {
      width: '80%',
      margin: '10px auto',
    },
    '@media (min-width: 1025px)': {
      width: '35%',
    },
    padding: '10px',
    backgroundColor: '#f3f3f3',
  },
  containerCommands: {
    padding: '10px',
    '@media (min-width: 350px)': {
      width: '80%',
      padding: '0px',
      margin: '10px auto',
    },
    '@media (min-width: 1025px)': {
      width: '60%',
    },
  },
  inlineBlock: {
    marginTop: '15px',
    '@media (min-width: 350px)': {
      display: 'flex',
      flexDirection: 'column',
    },

    '@media (min-width:1024px)': {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: '5px 50px'
    },
  }
})

const Saloon = () => {
  const [coffee, setCoffee] = useState([])
  const [allDay, setAllDay] = useState([])
  const [button, setButton] = useState(true)
  const [request, setRequest] = useState([])
  const [clientName, setClientName] = useState();
  const [tableNumber, setTableNumber] = useState();


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
    coffeeMenu()
    allDayMenu()
  }, [])

  const saveOrderItem = newItem => {
    setRequest([...request, newItem])
  };

  const getName = () => {
    return db.collection("users").doc(auth.currentUser.uid).get()
  }

  const cleanClientInfos = () => {
    setClientName('');
    setTableNumber('');
  }

  const addItemToOrder = (e, doc) => {
    const price = e.currentTarget.value;
    const item = e.currentTarget.title;
    getName().then((doc) => {
      return doc.data().Name
    }).then(name => {
      saveOrderItem({
        item: item,
        price: price,
        totalPriceItem: price,
        quantity: 1,
        meatOption: doc.options,
        additional: doc.additional,
        attendantName: name,
      });
    })
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <main className={css(styles.inlineBlock)} >
        <section className={css(styles.containerMenu)} >
          <section className={css(styles.sectionButtons)} >
            <MenuBtn class={css(styles.btnAllDayAndCoffee, styles.btnCoffeeBackground)}
              name="CAFÉ DA MANHÃ"
              value='coffee'
              className={css(styles.MenuBtn)}
              handleCLick={
                () => {
                  setButton((true))
                }
              }
            />
            <MenuBtn class={css(styles.btnAllDayAndCoffee, styles.btnDayBackground)}
              name="DIA"
              value='day'
              handleCLick={
                () => {
                  setButton((false))
                }
              }
            />
          </section>
          <section> {
            button ?
              (
                coffee.map(item => (
                  <MenuBtn name={item.item}
                    price={`R$${item.price}`}
                    class={css(styles.btnMenu, styles.btnMenuBackground)}
                    classPrice={css(styles.displayInline)}
                    value={item.price}
                    title={item.item}
                    handleCLick={
                      e => {
                        addItemToOrder(e, item)
                      }
                    }
                  />
                ))
              ) :
              (
                allDay.map(item => (
                  <MenuBtn name={`${item.item} `}
                    price={`R$${item.price}`}
                    class={css(styles.btnMenu)}
                    classPrice={css(styles.displayInline)}
                    value={item.price}
                    title={item.item}
                    handleCLick={
                      e => {
                        addItemToOrder(e, item)
                      }
                    }
                  />
                ))
              )
          }
          </section>
        </section>
        <section className={css(styles.containerCommands)} >
          <OrderHeader
            setClientName={setClientName}
            setTableNumber={setTableNumber}
            clientName={clientName}
            tableNumber={tableNumber}
          />

          <OrderTable request={request}
            setRequest={setRequest}
            clientName={clientName}
            clientTable={tableNumber}
            cleanClientInfos={cleanClientInfos}
          />
        </section>
      </main>
    </>
  )
}

export default Saloon;