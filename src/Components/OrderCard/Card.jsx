import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  orderCard: {
    border: '2px solid #F3E3CC',
    borderRadius: '10px',
    width: '40%',
    height: '200px',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#C3846D',
  },
  headerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    backgroundColor: '#F3E3CC',
    padding: '5px',
    marginBottom: '5px',
  },
  main: {
    borderRadius: '5px',
    backgroundColor: '#F3E3CC',
    padding: '5px',
    overflowY: 'scroll',
    height: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'center'
  },
  paragraph: {
    margin: '0px'
  }
})

const Card = (props) => {

  //   {/* const [request, setRequest] = useState()

  //      useEffect(() => {
  //         const req = () => {
  //             setRequest(props.request)
  //             console.log(request)
  //         }
  //         req()
  //     }, [request])



  const handleClick = (index, id) => {
    props.handleReadyRequest(index, id)
  }


  const checkMeatChoice = (item) => {
    if (item.clientMeatChoice) {
      return `| ${item.clientMeatChoice}`
    }
  }

  const CheckAdditionalChoice = (item) => {
    if (item.clientAddChoice) {
      return `| ${item.clientAddChoice}`
    }
  }


  const requestList = props.request
  return requestList.map((doc, index) => {
    return (
      <section className={css(styles.orderCard)}>
        <header className={css(styles.headerCard)}>
          <input type="checkbox" className={props.classInputCheck} />
          <div>
            <p className={css(styles.paragraph)}>Cliente/Mesa</p>
            <p className={css(styles.paragraph)}>{`${doc.itemsList[0].clientName} - ${doc.itemsList[0].tableNumber}`}</p>
          </div>
          <div>
            <p className={css(styles.paragraph)}>Atendente:</p>
            <p className={css(styles.paragraph)}>XXXXXX</p>
          </div>
          <div >
            <p className={css(styles.paragraph)}>Horário:</p>
            <p className={css(styles.paragraph)}>{doc.itemsList[0].time}</p>
          </div>
        </header>
        <main className={css(styles.main)}>
          {doc.itemsList.map(item => {
            return (
              <label>
                <input type="checkbox" className={props.classInputCheckItem} />
                {item.quantity} {item.item} {checkMeatChoice(item)} {CheckAdditionalChoice(item)}
              </label>
            )
          })
          }
        </main>
        <footer className={css(styles.footerCard)}>
          <button onClick={() => handleClick(index, doc.id)} className={props.classBtn} >
            {props.name}
          </button>
        </footer>
      </section >
    )
  })
}
export default Card

