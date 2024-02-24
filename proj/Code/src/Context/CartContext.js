import axios from "axios";
import { createContext, useEffect, useState } from "react";




export const cartContext = createContext()

 export default function CartContextProvider({children}) {
    const[cart,setCart]= useState({})
    async function getLoggedInCardProducts() {
  
        try {
        
         const {data}=await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{
           headers:{
             token:localStorage.getItem('token')}
            
         })
   
         setCart(data)
         
          
        } catch (error) {
       
         console.log(error);
        }
       }
useEffect(()=>{
    getLoggedInCardProducts()
},[])
    return <cartContext.Provider value={{cart, setCart}}>
       {children}
    </cartContext.Provider>
    
}