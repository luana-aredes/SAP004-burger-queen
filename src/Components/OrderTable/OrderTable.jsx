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

                <OrderTableRow
                    requestList={props.request}
                />

            </tbody>
        </table>
    )
}

export default OrderTable;
