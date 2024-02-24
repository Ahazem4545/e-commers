import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import Slider from "react-slick";
import { date } from 'yup';
import { toast } from 'react-toastify';

function BrandsDetails() {
   

    const {setCart}= useContext(cartContext)

    const {id}= useParams()
    const [brandsDetails, setBrandsDetails]= useState({})
    const [isLoding, setIsLoding]=useState(false)

    async function getSpecificDetails() {
        setIsLoding(true)
        const {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/brands/'+id)
        setBrandsDetails(data.data);
        console.log(data.data);
        setIsLoding(false)
    }

    useEffect(()=>{
getSpecificDetails()
    },[])
    return (

        <>{isLoding ?<div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div> :
                
                
                  <div className='row align-items-center py-5' >
                <div className="col-md-3">
                <img src={brandsDetails?.image}className='w-100' alt="" />
           
                </div>
                <div className="col-md-9">

                    <h2 className='mt-2'>{brandsDetails?.name}</h2>
                    <h5 className='font-sm text-main mt-2'>{brandsDetails?.slug}</h5>
                </div>

            </div>
                
                }
        </>



    )
}



export default BrandsDetails