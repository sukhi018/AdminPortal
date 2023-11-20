import React from 'react'
import './Styles/Error.css'
import {useNavigate} from 'react-router-dom';

function Error() {
  const navigate = useNavigate()
  const clickHandler = ()=>{
    navigate('/login')
  }
  return (
    <React.Fragment>
    <div className='error'>Session Expired</div>
    <button onClick={clickHandler}>Login Page</button>
    </React.Fragment>
  )
}

export default Error