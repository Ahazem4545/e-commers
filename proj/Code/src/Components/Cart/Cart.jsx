import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Address from '../Address/Address';
import { cartContext } from '../../Context/CartContext';

export default function Cart() {
  const {setCart:contextSetCart}= useContext(cartContext)
  const [isLoding,setIsLoding]=useState(false)
  const [TimeOutId,setTimeOutId]=useState()
  const [cartId,setCartId]=useState()

function removeProductFromCarts(productId) {


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async(result) => {
    if (result.isConfirmed) {
      const{data}= await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' + productId ,{
    headers:{
      token:localStorage.getItem('token')
    }
    
  })
  contextSetCart(data)
  setCart(data);

      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your produt has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
  
}
async function clearCart(productId) {


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn  btn-success",
      cancelButton: "btn  btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async(result) => {
    if (result.isConfirmed) {

      const{data}= await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' ,{
        headers:{
          token:localStorage.getItem('token')
        }
       
      })
      contextSetCart({})
      setCart(data)
      
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your products has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

 
  
}


 const[cart,setCart]= useState({})
  async function getLoggedInCardProducts() {
  
   try {
     setIsLoding(true)
    const {data}=await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem('token')}
       
    })
setCartId(data.data._id)
    setIsLoding(false)
    setCart(data)
    
     
   } catch (error) {
    setIsLoding(false)
    console.log(error);
   }
  }
 function updateProductCartCount(productId, count) {
setTimeOutId( setTimeout(async() => {
  if (count < 1) {
    removeProductFromCarts(productId)
    
   } else {
    const {data}=await axios.put('https://route-ecommerce.onrender.com/api/v1/cart/'+ productId ,{
      count
    },{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data);
    contextSetCart(data)
    setCart(data);
   }
 }, 500))
 }
  useEffect(()=>{
getLoggedInCardProducts()
  },[])
  return <>




  {isLoding ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div> :
  
  
  
  cart.data?.products.length > 0 ?
  
  <div className='mt-5 '>
      <button onClick={clearCart} className='btn btn-outline-danger d-block mt-5 ms-auto'>Clear Cart</button>

{cart.data?.products.map((cartProduct,index)=>{
  return  <CartProduct updateProductCartCount={updateProductCartCount}  removeProductFromCarts={ removeProductFromCarts} key={index} cartProduct={cartProduct}/>
})}

      <div className='d-flex justify-content-between'>
        <Link to={'/address/'+cartId} className='btn bg-main text-white'>CheckOut</Link>
        <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
      </div>

    </div>
  :

     <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>

  }
 
    
  </>
}
