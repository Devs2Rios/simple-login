import React, {
    useState,
    useEffect,
    useRef,
    useReducer,
    useContext,
} from 'react';
import classes from './Login.module.css';
import { AuthContext } from '../../store/auth-context';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

// Reducer functions
const emailReducer = (state, action) => {
        // Checks the values from the dispatchFunction
        if (action.type === 'USER_INPUT') {
            return {
                value: action.val,
                isValid: action.val.includes('@'),
            };
        } else if (action.type === 'INPUT_BLUR') {
            // Checks if the user stops writing
            // Using the state snapshot to access the last state values
            return {
                value: state.value,
                isValid: state.value.includes('@'),
            };
        }
        // Otherwise returns the initial state
        return { value: '', isValid: false };
    },
    passwordReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return {
                value: action.val,
                isValid: action.val.trim().length > 6,
            };
        } else if (action.type === 'INPUT_BLUR') {
            return {
                value: state.value,
                isValid: state.value.trim().length > 6,
            };
        }
        // Otherwise returns the initial state
        return { value: '', isValid: false };
    };

export default function Login() {
    const ctx = useContext(AuthContext),
        [emailRef, passwordRef] = [useRef(), useRef()],
        [formIsValid, setFormIsValid] = useState(false),
        [emailState, dispatchEmail] = useReducer(emailReducer, {
            value: '',
            isValid: undefined,
        }),
        [passwordState, dispatchPassword] = useReducer(passwordReducer, {
            value: '',
            isValid: undefined,
        });
    // Destructuring for better performance
    const { isValid: emailIsValid } = emailState,
        { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const checkLogin = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);
        return () => {
            console.log('Cleanup function');
            clearTimeout(checkLogin);
        };
    }, [emailIsValid, passwordIsValid]);
    // The object properties were passed as dependencies otherwise
    // the effect will be triggered with every change in the object

    // Input managers and validators
    const emailChangeHandler = event => {
            // We pass a val field in the dispatch function
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
        },
        validateEmailHandler = () => {
            dispatchEmail({ type: 'INPUT_BLUR' });
        },
        validatePasswordHandler = () => {
            dispatchPassword({ type: 'INPUT_BLUR' });
        };

    // Submision
    const submitHandler = event => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value);
        } else if (!formIsValid) {
            emailRef.current.focus();
        } else {
            passwordRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailRef}
                    htmlFor='email'
                    label='E-Mail'
                    type='email'
                    id='email'
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    isValid={emailIsValid}
                />
                <Input
                    ref={passwordRef}
                    htmlFor='password'
                    label='Password'
                    type='password'
                    id='password'
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    isValid={passwordIsValid}
                />
                <div className={classes.actions}>
                    <Button type='submit' className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}
