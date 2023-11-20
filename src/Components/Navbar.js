import React, {useState } from 'react'
import styles from './Styles/Navbar.module.css'

const Navbar = ({ifClicked}) => {

  const [userData, setUserData] = useState({
    handle: '',
  })

  return (
    <div className={styles.navbar}>
      <ul>
        <li><a onClick={()=>ifClicked('Profile')}>{userData.handle}</a></li>
        <li><a onClick={()=>ifClicked('Admin')} >Admin</a></li>
        <li><a onClick={()=>ifClicked('AddQues')} >Add Questions</a></li>
        <li><a onClick={()=>ifClicked('QuesChart')} >Questions</a></li>
        <li className={styles.logout_btn}><a onClick={()=>ifClicked('Logout')} href="#" >Logout</a></li>
      </ul>
    </div>
  )
}

export default Navbar
