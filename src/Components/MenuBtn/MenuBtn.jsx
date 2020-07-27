import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const MenuBtn = (props) => {
    return (
        <button className={props.class}
            onClick={props.handleCLick}
            id={props.id} >
            <div className={props.className}>{props.name}</div>
            <div className={props.classPrice}>{props.price}</div>
        </button>
    );
}

export default MenuBtn;
