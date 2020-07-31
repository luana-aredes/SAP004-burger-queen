import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db, auth } from '../../config/firebase';
import MenuBtn from '../../Components/MenuBtn/MenuBtn';
import Comanda from '../../Components/Comanda/Comanda';
import Header from '../../Components/Header/Header';
import OrderTable from '../../Components/Order_table/OrderTable'


const styles = StyleSheet.create({
  btnMenu: {
    backgroundColor: '#F3E3CC',
    marginTop: '10px',
    width: '100%',
    height: '50px',
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.4em',
  },
  btnAllDay: {
    width: '47.5%',
    height: '30px',
    backgroundColor: '#E5B163',
    marginLeft: '2.3%',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  btnCoffee: {
    width: '47.5%',
    height: '30px',
    backgroundColor: '#C3846D',
    marginRight: '2.3%',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  displayInline: {
    display: 'inline',
  },
  sectionButtons: {
    display: 'inline',
    width: '100%',
  },
  containerMenu: {
    width: '35%',
    padding: '10px',
    backgroundColor: '#f3f3f3',
  },
  containerCommands: {
    width: '60%',
    padding: '10px',
    backgroundColor: '#f3f3f3',
  },
  inlineBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const Saloon = () => {
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

  const saveOrderItem = newItem => setRequest([...request, newItem]);

  const addItemToOrder = e => {
    const price = e.currentTarget.value;
    const item = e.currentTarget.title;
    saveOrderItem({
      item: item,
      price: price,
      quantity: 1,
    });
  }

  const deleteItemOnOrder = (productId) => request.splice(productId, 1);

  const increaseQuantityOfItem = (productId) => request[productId].quantity += 1;

  const decreaseQuantityOfItem = (productId) => {
    request[productId].quantity !== 0 ?
      request[productId].quantity = request[productId].quantity - 1 :
      request[productId].quantity = 0
  }

  return (
    <main >
      <header >
        <Header />
      </header>
      <body className={css(styles.inlineBlock)} >
        <section className={css(styles.containerMenu)}>
          <section className={css(styles.sectionButtons)}>
            <MenuBtn
              class={css(styles.btnCoffee)}
              name="CAFÉ DA MANHÃ"
              value='coffee'
              className={css(styles.MenuBtn)}
              handleCLick={
                () => {
                  setButton((true))
                }
              }
            />
            <MenuBtn
              class={css(styles.btnAllDay)}
              name="DIA"
              value='day'
              handleCLick={
                () => {
                  setButton((false))
                }
              }
            />
          </section >
          <section > {
            button ?
              (
                coffee.map(item => (
                  <MenuBtn
                    name={item.item}
                    price={`R$${item.price}`}
                    class={css(styles.btnMenu)}
                    classPrice={css(styles.displayInline)}
                    value={item.price}
                    title={item.item}
                    handleCLick={e => addItemToOrder(e)
                    }
                  />
                ))
              ) :
              (
                allDay.map(item => (
                  <MenuBtn
                    name={`${item.item} `}
                    price={`R$${item.price}`}
                    class={css(styles.btnMenu)}
                    classPrice={css(styles.displayInline)}
                    value={item.price}
                    title={item.item}
                    handleCLick={
                      e => {
                        addItemToOrder(e)
                      }
                    }
                  />
                ))
              )
          }
          </section>
        </section>

        <section className={css(styles.containerCommands)}>
          <Comanda />
          <OrderTable
            request={request}
            handleClickDelItemBtn={deleteItemOnOrder}
            handleClickIncreaseBtn={increaseQuantityOfItem}
            handleClickDecreaseBtn={decreaseQuantityOfItem} />
        </section>
      </body>
    </main >

  )
}

export default Saloon;