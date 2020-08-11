import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  orderCard: {
    border: '2px solid #F3E3CC',
    borderRadius: '10px',
    width: '45%',
    height: '250px',
    margin: '0.5%',
    padding: '15px',
    backgroundColor: '#C3846D',
  },
  headerCard: {
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '5px',
    backgroundColor: '#F3E3CC',
    padding: '5px',
    marginBottom: '5px',
    fontWeight: '600',
    fontSize: '1.2em',

  },
  main: {
    borderRadius: '5px',
    backgroundColor: '#F3E3CC',
    padding: '5px',
    overflowY: 'scroll',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.4em'
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'center',
  },
  paragraph: {
    margin: '0px'
  },
  labelInput: {
    padding: '5px',
    display: 'flex',
    alignItems: 'center'
  }
})

const Card = (props) => {

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
          {props.place === 'kitchen' ? <input type="checkbox" className={props.classInputCheck} />
            : false}

          <div>
            <p className={css(styles.paragraph)}>Cliente/Mesa</p>
            <p className={css(styles.paragraph)}>{`${doc.itemsList[0].clientName} - ${doc.itemsList[0].tableNumber}`}</p>
          </div>
          <div>
            <p className={css(styles.paragraph)}>Atendente</p>
            <p className={css(styles.paragraph)}>XXXXXX</p>
          </div>
          <div >
            {props.place === 'kitchen' ?
              <>
                <p className={css(styles.paragraph)}>Horário</p>
                <p className={css(styles.paragraph)}>{doc.itemsList[0].time}</p>
              </> :
              <>
                <p className={css(styles.paragraph)}>Preparo</p>
                <p className={css(styles.paragraph)}>{doc.itemsList[0].time}</p>
              </>

            }
          </div>
        </header>
        <main className={css(styles.main)}>
          {doc.itemsList.map(item => {
            return (
              <>
                {props.place === 'kitchen' ?
                  <label className={css(styles.labelInput)}>
                    <input type="checkbox" className={props.classInputCheckItem} />
                    {item.quantity} {item.item} {checkMeatChoice(item)} {CheckAdditionalChoice(item)}
                  </label>
                  :
                  <div>
                    {item.quantity} {item.item} {checkMeatChoice(item)} {CheckAdditionalChoice(item)}
                  </div>
                }
              </>

            )
          })
          }
        </main>
        <footer className={css(styles.footerCard)}>
          <img src={require('../../assets/tick.png')} className={props.classImgCheck} />
          <button
            onClick={() => handleClick(index)}
            className={props.classBtn}>
            {props.name}
          </button>
        </footer>
      </section >
    )
  })
}

export default Card

