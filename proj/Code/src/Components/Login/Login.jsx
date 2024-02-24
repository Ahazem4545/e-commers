import React, {  useContext, useState } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';

export default function Login() {

const {isUserLoggedIn,setUserLoggedIn} = useContext(authContext)

const [errorMsg ,setErrorMsg]=useState('')


const [isloading , setIsloading]= useState(false)
const navigate=useNavigate()
const validationSchema = yup.object({
  email:yup.string().required('email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'enter valide email'),
  password:yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'password not valide'),
  
})




 const {values , handleSubmit,errors,handleChange,touched,handleBlur,isValid} = useFormik({
  initialValues:{
    email:'',
    password:'',
   
    

  },
 onSubmit:async()=>{
  setErrorMsg('')
  try {setIsloading(true)
    const {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values)
if (data.message =='success') {
  setUserLoggedIn(true)
  localStorage.setItem('token',data.token)

  navigate('/home')
  // if (window.location.pathname == '/login') {
  //    navigate('/home')
    
  // }else{
  //   navigate(window.location.pathname)
  // }
 
  
}    
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
      <h1>login Now :</h1>
      <form onSubmit={handleSubmit}>
       
        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email&& touched.email&&<p className='alert alert-danger'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password&& touched.password&&<p className='alert alert-danger'>{errors.password}</p>}

       

        { errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

           {isloading ?   
                   <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
          
                  <button type='submit' disabled={!isValid || isloading} className='btn bg-main px-3 text-white ms-auto d-block'>login</button>

          }  

      </form>
    </div>
  </>
}
