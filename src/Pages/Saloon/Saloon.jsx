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
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2.2em',
    '@media (max-width: 424px)': {
      fontSize: '1.2em'
    },
    '@media (min-width: 760px)': {
      fontSize: '1.4em'
    },
    '@media (min-width: 1024px)': {
      fontSize: '1.0em',
      height: '50px'
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
    '@media (min-width: 1024px)': {
      fontSize: '0.8em',
      height: '35px'
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
    '@media (min-width: 425px)': {
      width: '80%',
    },
    '@media (min-width: 760px)': {
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
    },
    '@media (min-width: 760px)': {
      width: '60%',
    },
  },
  inlineBlock: {
    '@media (min-width: 425px)': {
      display: 'block',
    },
    '@media (min-width: 760px)': {
      display: 'flex',
      justifyContent: 'space-between'
    },
  }
})

const Saloon = () => {
  const [coffee, setCoffee] = useState([])
  const [allDay, setAllDay] = useState([])
  const [button, setButton] = useState(true)
  const [request, setRequest] = useState([])
  const [error, setError] = useState(null)
  const [clientName, setClientName] = useState('')
  const [clientTable, setclientTable] = useState('')

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

  const getClientName = inputedName => setClientName(inputedName);
  const getClientTable = inputedTable => setclientTable(inputedTable);

  return (
    <main>
      <header>
        <Header
        />
      </header>
      <body className={css(styles.inlineBlock)} >
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
          <OrderHeader handleInputClientName={getClientName}
            handleInputClientTable={getClientTable}
          />
          <OrderTable request={request}
            setRequest={setRequest}
            clientName={clientName}
            clientTable={clientTable}
          />
        </section>
      </body>
    </main>
  )
}

export default Saloon;