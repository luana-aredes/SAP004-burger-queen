import React from 'react';
import OrderTableRow from '../OrderTableRow/OrderTableRow';

const OrderTable = (props) => {
    return (

        <table >
            <thead >
                <tr >
                    <th > Produtos </th>
                    <th > Opções </th>
                    <th > Adicional </th>
                    <th > Quantidade </th>
                    <th> Preço </th>
                    <th> Deletar </th>
                </tr>
            </thead>
            <tbody>
                {props.request.map((orderItem, index) => (
                    <OrderTableRow
                        item={orderItem.item}
                        price={orderItem.price}
                        quantity={orderItem.quantity}
                        id={index}
                        handleClickDelBtn={props.handleClickDelItemBtn}
                        handleClickIncreaseBtn={props.handleClickIncreaseBtn}
                        handleClickDecreaseBtn={
                            props.handleClickDecreaseBtn
                        }
                    />
                ))}
            </tbody>
        </table>
    )
}

export default OrderTable;
