import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import Home from '../Home/Home'
import { Navigate } from 'react-router-dom'

export default function AuthProtedctedRoute({children}) {
    const {isUserLoggedIn,setUserLoggedIn} = useContext(authContext)

  return (
    <>
    {isUserLoggedIn ? <Navigate to={'/home'} /> : children}
    
    </>
  )
}
