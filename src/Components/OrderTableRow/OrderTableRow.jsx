import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite';
import DeleteImg from '../../assets/trash.png'

const styles = StyleSheet.create({
  decreaseBtn: {
    backgroundColor: 'tomato',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    width: '25px',
    height: '25px'
  },
  deleteImg: {
    width: '25px',
    height: '25px'
  },
  increaseBtn: {
    backgroundColor: '#37AE60',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    width: '25px',
    height: '25px'
  },
  quantifier: {
    border: 'none',
    width: '25px',
    height: '25px'
  },
  fontRow: {
    fontSize: '80%'
  },
  columnWidth: {
    width: '16%'
  },
  block: {
    display: 'block'
  }

})

const OrderTableRow = (props) => {

  const list = props.requestList;

  const deleteItem = () => props.handleClickDelBtn(props.id);
  const increaseQuantityOfItem = () => props.handleClickIncreaseBtn(props.id);
  const decreaseQuantityOfItem = () => props.handleClickDecreaseBtn(props.id);

  const [option, setOption] = React.useState('')
  const [additional, setAdditional] = React.useState([])


  const Options = (doc) => {
    if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
      return (
        doc.meatOption.map((opt, index) => {
          return (
            <span key={index} className={css(styles.block)}>
              <label><input type="radio" value={opt} name={opt} onClick={() => {
                setOption(opt)
                doc.optionMeat = option
                console.log(option)
              }} checked={opt === option}
              />{opt}</label>
            </span>

          )
        })
      )

    }
  }


  const saveAdc = (e, adc, doc) => {
    const newAdc = e.currentTarget.value
    console.log(e.currentTarget.value)
    if (!additional.includes(newAdc) && additional !== []) {
      setAdditional([...additional, newAdc])
      doc.add = additional
      console.log(additional)
    } else if (additional.includes(newAdc)) {
      console.log(additional)
      additional.splice(additional.indexOf(adc), 1)
      doc.add = additional
      console.log(additional)
    }

  }
  const AdditionalBurguer = (doc) => {
    if (doc.item === 'Hamburguer simples' || doc.item === 'Hamburguer duplo') {
      return (
        doc.additional.map((adc, index) => {
          return (
            <span key={index} className={css(styles.block)}>
              <label><input type="checkbox" value={adc} name={adc} onClick={e => saveAdc(e, adc, doc)} checked={null}
              />{adc}</label>
            </span>

          )
        })
      )
    }
  }


  return (
    list.map((doc, index) => {
      return (
        <tr className={css(styles.fontRow)}>
          <td className={css(styles.columnWidth)}> {doc.item}</td>
          <td className={css(styles.columnWidth)}>{Options(doc, index)} </td>
          <td className={css(styles.columnWidth)}>{AdditionalBurguer(doc, index)}</td>
          <td className={css(styles.columnWidth)}>
            <button className={css(styles.decreaseBtn)}>
              -
        </button>
            <button className={css(styles.quantifier)}>
              {doc.quantity}
            </button>
            <button className={css(styles.increaseBtn)} >
              +
        </button>

          </td>

          <td className={css(styles.columnWidth)}>{doc.price}</td>
          <td className={css(styles.columnWidth)}>
            <img className={css(styles.deleteImg)}
              src={DeleteImg}
              alt="Delete" />
          </td>
        </tr >
      )
    })
  )
}

export default OrderTableRow;
