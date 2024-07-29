import React, { useContext, useEffect } from 'react'
import Register from './Register/Register'
import { UserContext } from './Register/UserContext'
import axios from 'axios'
import Chart from './Chart'

const Routes = () => {
    const {username,id,setId,setUsername}= useContext(UserContext)


    useEffect(()=>{

        axios.get("/profile",{
            withCredentials:true
        }).then((response)=>{
            setId(response.data.id)
            setUsername(response.data.username)
        })

    },[])
    
    if(username){
        return <Chart/>
    }
  return (
    <Register/>
  )
}

export default Routes
