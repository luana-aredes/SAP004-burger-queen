import React from 'react';

const Input = (props) => {
    return (
        <input
            type={props.type}
            className={props.class}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}
export default Input;


