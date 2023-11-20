import React from 'react'
import {useReducer, useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import './Styles/Login.css'
import {useDispatch} from 'react-redux'
import {storeActions} from "./Store/index";

const reducer = (state, action) => {
    if (action.type === 'password') {
        return {
            ...state,
            password: action.value
        }
    } else if (action.type === 'username') {
        return {
            ...state,
            username: action.value
        }
    }
    return state
}

const initialInputs = {
    password: '',
    username: ''
}

function Login() {
    const disp = useDispatch()
    const [inputs,
        dispatch] = useReducer(reducer, initialInputs)
    const navigate = useNavigate()

    const [validationErrors,
        setValidationErrors] = useState({name: '', email: '', username: '', password: ''})
    let valid = 1
    const validateUsername = () => {
        const usernamePattern = /^(?=[a-zA-Z_])[a-zA-Z0-9_]*/

        if (inputs.username.length < 4 || inputs.username.length > 20 || !usernamePattern.test(inputs.username)) {
            valid = 0

            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Invalid Username'
            }))
        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                username: ''
            }))
        }
    }

    const validatePassword = () => {
        if (inputs.password.length < 8 || inputs.password.length > 30) {
            valid = 0
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Invalid password'
            }))
        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: ''
            }))
        }
    }

    const validate = async(event) => {
        validateUsername()
        validatePassword()
        if (valid) {
            // ill check request the api to check if we can create this account or not if we
            // can not because of unqiue username or unique email ill show it on the site
            event.preventDefault()

            try {
                const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, {
                    handle: inputs.username,
                    password: inputs.password
                })
                if (data.success) {
                    // ill get the token which i have to add to the storage and redirect to the
                    // dashboard
                    localStorage.setItem('chatToken', 'Bearer '+data.token)
                    disp(storeActions.setValid({val: true}))
                    navigate('/dashboard')
                }
            } catch (error) {
                console.log(error)
                const message = error.response.data.msg;
                if (message.includes('Account')) {
                    setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        username: 'Account does not exists.'
                    }));
                }
                if (message.includes('Invalid')) {
                    setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        password: 'Wrong password'
                    }));
                } else {
                    console.error('Server Error:', error.response.data);
                }
            }
        }
    }
    return (
        <React.Fragment>
            <div className='login-logo'>
              <h1>Admin Portal</h1>
            </div>
            <div className='login-div'>
                <label htmlFor="username">Username</label>
                <input
                    required
                    value
                    ={inputs.username}
                    name='username'
                    id='username'
                    onChange={(event) => dispatch({type: 'username', value: event.target.value})}type="text"/><br/>
                <p id='usernameValid'>{validationErrors.username}</p>
                <label htmlFor="password">Password</label>
                <input
                    required
                    value
                    ={inputs.password}
                    name="password"
                    id="password"
                    onChange={(event) => dispatch({type: 'password', value: event.target.value})}type="password"/><br/>
                <p id='passwordValid'>{validationErrors.password}</p>
                <button type='submit' onClick={validate}>Login</button>
            </div>
        </React.Fragment>
    )
}

export default Login

// register login create a search bar request component to show requests