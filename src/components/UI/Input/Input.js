import classes from './Input.module.css';
import React, { useRef, useImperativeHandle } from 'react';

// This component is wrapped as a ref
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef(),
        activate = () => {
            // Focus comes from Vanilla JS
            inputRef.current.focus();
        };
    useImperativeHandle(ref, () => {
        return { focus: activate };
    });
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;
