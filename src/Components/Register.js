import React from 'react'
import { useReducer,useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  if (action.type==='name')
  {
    return {...state,name:action.value}
  }else if (action.type==='email')
  {
    return {...state,email:action.value}  }
  else if (action.type==='password')
  {
    return {...state,password:action.value}  }
  else if (action.type==='username')
  {
    return {...state,username:action.value}  }
  return state
}

const initialInputs = {
  name:'',
  password:'',
  username:'',
  email:''
}

function Register() {
  
    const [inputs, dispatch] = useReducer(reducer, initialInputs)
    const [validationErrors, setValidationErrors] = useState({
      name: '',
      email: '',
      username: '',
      password: '',
    })
    
    let valid = 1

    const navigate = useNavigate()

    const validateName = () => {
      console.log(inputs.name)
      if (inputs.name.length < 3 || inputs.name.length >20) {
        valid = 0
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          name: 'Name must be at least 3 characters long and smaller than 20 characters.',
        }))
      } else {
        setValidationErrors((prevErrors) => ({ ...prevErrors, name: '' }))
      }
    }
  
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(inputs.email)) {
        valid = 0

        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email format.',
        }))
      } else {
        setValidationErrors((prevErrors) => ({ ...prevErrors, email: '' }))
      }
    }
    const validateUsername = () => {
      const usernamePattern = /^(?=[a-zA-Z_])[a-zA-Z0-9_]*/

      if (inputs.username.length < 4 || inputs.username.length > 20 || !usernamePattern.test(inputs.username)) {
        valid = 0

        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Username must be between 4 and 20 characters and needs to start with an alphabet character.',
        }))
      } else {
        setValidationErrors((prevErrors) => ({ ...prevErrors, username: '' }))
      }
    }
  
    const validatePassword = () => {
      if (inputs.password.length < 8 || inputs.password.length >30 ) {
        valid = 0
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password must be at least 8 characters long and should not exceed 39 characters.',
        }))
      } else {
        setValidationErrors((prevErrors) => ({ ...prevErrors, password: '' }))
      }
    }

    const validate =  async (event)=>{
      validateName()
      validateEmail()
      validateUsername()
      validatePassword()
      if (valid)
      {
        // ill check request the api to check if we can create this account or not if we can not because of unqiue username or unique email ill show it on the site
        event.preventDefault()
        
        try {
          const { data } = await axios.post('/api/v1/auth/register', { name:inputs.name, email:inputs.email, handle:inputs.username,password:inputs.password })
          console.log(data)
          if (data.success)
          {
            // redirect to login page
            navigate(`/login`)
          }} 
        catch (error) {
          const  message  =error.response.data.msg
            if (message.includes('email')) {
              setValidationErrors((prevErrors) => ({
              ...prevErrors,
              email: 'Email already exists.',
            }))
            }
            if (message.includes('handle')) {
              setValidationErrors((prevErrors) => ({
              ...prevErrors,
              username: 'Username already exists.',
            }))
            }
            else {
            console.error('Server Error:', message)
            }
        }
      }
    }

    return (
    <React.Fragment>
        <label htmlFor="name">Name</label>
        <input required value ={inputs.name}type="text" name='name' id='name' onChange={(event)=>dispatch({type:'name',value:event.target.value})}/><br />
        <p id='nameValid'>{validationErrors.name}</p>

        <label htmlFor="email">Email</label>
        <input required value ={inputs.email}type="email" name='email' id='email' onChange={(event)=>dispatch({type:'email',value:event.target.value})}/><br />
        <p id='emailValid'>{validationErrors.email}</p>
        
        <label htmlFor="username">Username</label>
        <input required value ={inputs.username}type="text" name='username' id='username'onChange={(event)=>dispatch({type:'username',value:event.target.value})}/><br />
        <p  id='usernameValid'>{validationErrors.username}</p>

        <label htmlFor="password">Password</label>
        <input required value ={inputs.password}type="password" name="password" id="password" onChange={(event)=>dispatch({type:'password',value:event.target.value})}/><br />
        <p id='passwordValid'>{validationErrors.password}</p>
        
        <button type='submit' onClick={validate}>Submit</button>
    </React.Fragment>)
}

export default Register