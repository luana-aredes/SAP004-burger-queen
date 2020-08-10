import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  orderCard: {
    border: '2px solid #C3846D',
    borderRadius: '10px',
    width: '50%',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#F3E3CC',
  },
  headerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid #C3846D'
  },
  styleBtn: {
    backgroundColor: '#37AE60',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    padding: '7px',
    marginTop: '15px',
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputCheck: {
    width: '25px',
    height: '25px',
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

  //  */}

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
          <input type="checkbox" className={css(styles.inputCheck)} />
          <div> {`Cliente: ${doc.itemsList[0].clientName}`}</div>
          <div>{`Mesa: ${doc.itemsList[0].tableNumber}`}</div>
          <div>{`Horário: ${doc.itemsList[0].time}`}</div>
        </header>
        {doc.itemsList.map(item => {
          return (
            <main>
              <label>
                <input type="checkbox" />
                {item.quantity} {item.item} {checkMeatChoice(item)} {CheckAdditionalChoice(item)}
              </label>
            </main>
          )
        })
        }
        <footer className={css(styles.footerCard)}>
          <button onClick={() => handleClick(index, doc.id)} className={css(styles.styleBtn)}>
            {props.name}
          </button>
        </footer>
      </section >
    )
  })
}
export default Card

