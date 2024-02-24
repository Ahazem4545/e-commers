import React, { useState } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
const [errorMsg ,setErrorMsg]=useState('')
const [isloading , setIsloading]= useState(false)
const navigate=useNavigate()
const validationSchema = yup.object({
  name: yup.string().required('name is required').min(3,'min length 3 character').max(20,'max length 20 character'),
  email:yup.string().required('email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'enter valide email'),
  password:yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'password not valide'),
  rePassword:yup.string().required('repassword is required').oneOf([yup.ref('password')]),
  phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/),
  // age:yup.number().required('age required').min(5)
  // mariage:yup.boolean().required('age required').min(5)
})



// function validate(values) {
//   const errors = {};
//   if(values.name==''){
//     errors.name='name is required'
//   }else if (values.name.length<3){
//     errors.name ='min length 3 character'
//  }else if (values.name.length>20){
//   errors.name ='max length 20 character'
//  }
//   if (values.email==''){
//     errors.email='email is required'    
//   }else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)){
//     errors.email='enter valide email'
//   }
//   if (values.password=='') {
//     errors.password='password is required'
//   }else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(values.password)){
//     errors.password='password not valide'
//   }
//   if (values.password !=values.rePassword) {
//     errors.rePassword='repassword not matched with password'
    
//   }
//   if (values.phone=='') {
//     errors.phone='phone is required'
//   }else if(!(/^01[0125][0-9]{8}$/).test(values.phone)) {
//     errors.phone='enter valide number'
//   }
//   console.log(errors);
//   return errors
// }
 const {values , handleSubmit,errors,handleChange,touched,handleBlur,isValid} = useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
   
    

  },
 onSubmit:async()=>{
  setErrorMsg('')
  try {setIsloading(true)
    const {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values)
if (data.message =='success') {
  navigate('/login')
  
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
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name&& touched.name&&<p className='alert alert-danger'>{errors.name}</p>}
        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email&& touched.email&&<p className='alert alert-danger'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password&& touched.password&&<p className='alert alert-danger'>{errors.password}</p>}

        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword&& touched.rePassword&&<p className='alert alert-danger'>{errors.rePassword}</p>}

        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone&& touched.phone&&<p className='alert alert-danger'>{errors.phone}</p>}

        { errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

           {isloading ?   
                   <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
          
                  <button type='submit' disabled={!isValid || isloading} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>

          }  

      </form>
    </div>
  </>
}
