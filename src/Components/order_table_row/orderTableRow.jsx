import React from 'react'
import Button from '../Button/Button'
import Options from '../input_options/options'
import Additional from '../Input_additional/additional'


const OrderTableRow = (props) => {


    const temHamburguer = (parm) => {
        if (props.item === 'Hamburguer simples' || props.item === 'Hamburguer duplo') {
            if (parm === 'option') {
                return <Options />
            } else { return <Additional /> }
        }
    }

    return (
        <tr className={props.class}>
            <td> {props.item}</td>
            <td> {temHamburguer('option')}</td>
            <td> {temHamburguer('additional')}</td>

            <td>
                <Button
                    name={'-'} />
                <Button
                    name={props.quantity} />
                <Button
                    name={'+'} />
            </td>

            <td>{props.price}</td>
            <td>
                <Button
                    name={'delete'} />
            </td>
        </tr >
    )
}
export default OrderTableRow