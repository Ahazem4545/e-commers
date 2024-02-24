import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'





function Orders() {
  const [isLoding,setIsLoding]=useState(false)

const [orders,setOrders]=useState([])
async function getAllOrders(id) {
setIsLoding(true)
  const {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/orders/user/'+id)
  setOrders(data);
  setIsLoding(false)
}
useEffect(()=>{
const {id} = jwtDecode(localStorage.getItem('token'));
console.log(id);
getAllOrders(id)

},[])


  return (<>
   
    <h2>All Orders</h2>

    {isLoding ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div> :
    
    
    orders.map((order)=>{
      return <div className='order shadow rounded p-4 my-5' key={order.id}>


<div className='d-flex align-items-center'>
<h2 className='h1 fw-bolder '># {order.id}</h2>
<h4 className='text-primary mx-4 fw-bold '>Processing</h4>
</div>
<p>you have ordered <strong>{order.cartItems.length}</strong> items.</p>
<div className='d-flex'>
  {order.cartItems.map((item)=>{
    return <img src={item.product.imageCover} style={{width:150}} className='img-thumbnail mx-1' key={item._id} alt="" />
  })}
</div>
<hr />
<p><strong>Total amount:</strong>{order.totalOrderPrice}EGP</p>
    </div>

     
    })}
    




   </>)
}

export default Orders