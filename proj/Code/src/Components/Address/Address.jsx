import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
function Address() {
    const [errorMsg ,setErrorMsg]=useState('')
    const [isloading , setIsloading]= useState(false)
    const navigate=useNavigate()
    let {cartId} = useParams()
    console.log(cartId);

    const validationSchema = yup.object({
      name: yup.string().required('name is required').min(3,'min length 3 character').max(20,'max length 20 character'),
      city: yup.string().required('city is required').min(3,'min length 3 character').max(20,'max length 20 character'),
      phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/),
      // age:yup.number().required('age required').min(5)
      // mariage:yup.boolean().required('age required').min(5)
    })
    

     const {values , handleSubmit,errors,handleChange,touched,handleBlur,isValid} = useFormik({
      initialValues:{
        name:'',
        phone:'',
        city:'',
    
      },
     onSubmit:async()=>{
      setErrorMsg('')
      try {
        let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}`,{
            shippingAddress:values
        },{
            headers:{
            token:localStorage.getItem('token')
        },
        params:{
            url:'http://localhost:3001'
        }
        })
        window.open(data.session.url,"_self")
      } catch (error) {
    setErrorMsg(error.response.data.message)    
      }
    
      setIsloading(false)
    },
        // validate
        validationSchema
    })
      return <>
        <div className="w-75 m-auto my-5">
          <h1>Address Now :</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className='my-1'>Name:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
            {errors.name&& touched.name&&<p className='alert alert-danger'>{errors.name}</p>}
            
            <label htmlFor="city" className='my-1'>city:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.city} type="text" className='form-control mb-3' id='city' name='city' />
            {errors.city&& touched.city&&<p className='alert alert-danger'>{errors.city}</p>}
            
            <label htmlFor="phone" className='my-1'>phone:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
            {errors.phone&& touched.phone&&<p className='alert alert-danger'>{errors.phone}</p>}
    
            { errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    
               {isloading ?   
                       <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
              :
              
                      <button type='submit' disabled={!isValid || isloading} className='btn bg-main px-3 text-white ms-auto d-block'>Checkout</button>
    
              }  
    
          </form>
        </div>
      </>
}

export default Address