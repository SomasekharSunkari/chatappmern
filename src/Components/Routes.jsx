import React, { useContext, useEffect } from 'react'
import Register from './Register/Register'
import { UserContext } from './Register/UserContext'
import axios from 'axios'

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
        return "Login" + username
    }
  return (
    <Register/>
  )
}

export default Routes
