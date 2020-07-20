import React from 'react';

const Input = (props) => {
    return (
        <input type={props.type} className={props.class} placeholder={props.placeholder} />
    );
}

export default Input;