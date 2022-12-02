import React, { useState, useEffect, useReducer, useContext } from 'react';
import AuthContext from '../../store/auth-context';
// Components
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer functions
const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        // Checks if the event target value
        // provided by the dispatch has an @
        // and returns the actual value and the check
        return { value: action.val, isValid: action.val.includes('@') };
    } else if (action.type === 'INPUT_BLUR') {
        // Checks if user finished writing
        // Using the state snapshot to access the last state value
        return { value: state.value, isValid: state.value.includes('@') };
    }
    // Otherwise returns the initial state
    return { value: '', isValid: false };
};
// Same logic applied before with the password
const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    } else if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    // Otherwise returns the initial state
    return { value: '', isValid: false };
};

export default function Login() {
    // Context
    const ctx = useContext(AuthContext);

    // State
    const [formIsValid, setFormIsValid] = useState(false);

    // Reducers
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        // Initial state
        value: '',
        isValid: undefined,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        // Initial state
        value: '',
        isValid: undefined,
    });

    // Destructuring for better performance
    // and not overchecking side effects
    const { isValid: emailIsValid } = emailState,
        { isValid: passwordIsValid } = passwordState;

    // Effects
    useEffect(() => {
        // Check for changes every 500ms and not with every key press
        const checkLogin = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);
        // Clearup function
        return () => {
            console.log('Cleanup');
            clearTimeout(checkLogin);
        };
    }, [emailIsValid, passwordIsValid]);
    // The object properties were passed as dependencies
    // So checks will stop when the values are true
    // If you use the object instead the effect will be triggered
    // with every change in it, even if it is not inside the
    // dependencies array

    // Input managers
    const emailChangeHandler = event => {
            // We pass a val field in the dispatch function
            // that holds the event target value
            dispatchEmail({
                type: 'USER_INPUT',
                val: event.target.value,
            });
        },
        passwordChangeHandler = event => {
            dispatchPassword({
                type: 'USER_INPUT',
                val: event.target.value,
            });
        };

    // Validators
    const validateEmailHandler = () => {
            dispatchEmail({ type: 'INPUT_BLUR' });
        },
        validatePasswordHandler = () => {
            dispatchPassword({ type: 'INPUT_BLUR' });
        };

    // Submision
    const submitHandler = event => {
        event.preventDefault();
        ctx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}
