import { createContext, useEffect, useState } from "react";




export const authContext = createContext()

 export default function AuthContextProvider({children}) {
    const [isUserLoggedIn,setUserLoggedIn]= useState(!!localStorage.getItem('token'))
    // useEffect(()=>{
    //     if (localStorage.getItem('token') != null) {
    //         setUserLoggedIn(true)
    //     }
    // },[])
    return <authContext.Provider value={{isUserLoggedIn, setUserLoggedIn}}>
       {children}
    </authContext.Provider>
    
}