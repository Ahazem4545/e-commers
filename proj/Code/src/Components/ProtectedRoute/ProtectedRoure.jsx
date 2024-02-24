import React, { useContext } from 'react'
import Login from '../Login/Login'
import { authContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoure({children}) {
    const {isUserLoggedIn,setUserLoggedIn} = useContext(authContext)

  return (
    
    <>
    {/* {isUserLoggedIn? children : <Navigate to={'/login'}/>} */}
    {isUserLoggedIn? children : <Login/>}
    
    
    </>
  )
}
