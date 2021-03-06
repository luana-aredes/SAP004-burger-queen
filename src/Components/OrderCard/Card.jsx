import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { db } from '../../config/firebase';

const styles = StyleSheet.create({
  orderCard: {
    border: '2px solid #F3E3CC',
    borderRadius: '10px',
    width: '45%',
    height: '250px',
    margin: '0.5%',
    padding: '15px',
    backgroundColor: '#C3846D',
    '@media (max-width: 770px)': {
      width: '90%',
      margin: '5px auto'
    },
    '@media (max-width: 425px)': {
      fontSize: '0.8em'
    }
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
    fontSize: '1.4em',
    paddingLeft: '10px'
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
  const handleClick = (id, id2, index) => {
    props.place === 'saloon' ?
      props.handleDeliveredRequest(id2) :
      props.handleReadyRequest(id, index)
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

  const checked = (e, doc) => {
    const id = e.currentTarget.value
    if (doc.checked === undefined || doc.checked === false) {
      db.collection("requests").doc(id).update({
        checked: true
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    } else {
      db.collection("requests").doc(id).update({
        checked: false
      })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    }

  }




  const requestList = props.request

  return requestList.map((doc, index) => {
    return (
      <section className={css(styles.orderCard)}>
        <header className={css(styles.headerCard)}>
          {props.place === 'kitchen' ?
            <input type="checkbox" value={doc.id} checked={doc.checked} onClick={(e) => {
              checked(e, doc)
            }} className={props.classInputCheck} />
            : (false)
          }
          <div>
            <p className={css(styles.paragraph)}>Cliente/Mesa</p>
            <p className={css(styles.paragraph)}>{`${doc.itemsList[0].clientName} - ${doc.itemsList[0].tableNumber}`}</p>
          </div>
          <div>
            <p className={css(styles.paragraph)}>Atendente</p>
            <p className={css(styles.paragraph)}>{doc.itemsList[0].attendantName}</p>
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
                {
                  props.place === 'kitchen' ?
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
          <img src={require('../../assets/tick.png')} className={props.classImgCheck} alt='Checkbox' />
          <button
            onClick={() => handleClick(doc.id, doc.id2, index)}
            className={props.classBtn}>
            {props.name}
          </button>
        </footer>
      </section >
    )
  })
}

export default Card

