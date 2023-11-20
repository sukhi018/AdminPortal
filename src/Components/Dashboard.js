import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import styles from './Styles/Dashboard.module.css' 
import Logo from './Logo'
import Admin from './Admin'
import AddQues from './AddQues'
import QuesChart from './QuesChart'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {storeActions} from "./Store/index";

function Dashboard() {
  const disp = useDispatch()

  const navigate = useNavigate()
    const valid = useSelector((state)=>state.quesBank.valid)
    useEffect(()=>{
      if (!valid)
      {
        navigate(`/error`)
      }
    },[valid])
    const [sideComponent,setSideComponent] = useState(<Logo/>)
    const containerStyle = {
      height: '100%',
      width: '100%',
    };

    const ifClicked = async(section)=>{
      switch (section) {
        case 'Admin':
          setSideComponent(<Admin />)
          break
        case 'AddQues':
          setSideComponent(<AddQues />)
          break
        case 'QuesChart':
          setSideComponent(<QuesChart/>)
          break
        case "Logout":
            localStorage.removeItem('chatToken');
            disp(storeActions.setValid({val: false}))
            navigate(`/login`)
            break
        default:
          break
      }
    }
  return (
    <div style={containerStyle} >
        <div className={styles.main}>
            <Navbar ifClicked={ifClicked}></Navbar>
            <div className={styles.sideDiv}>
                {sideComponent}
            </div>
        </div>
    </div>
  )
}

export default Dashboard