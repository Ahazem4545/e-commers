import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { date } from 'yup';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

function ProductDetails() {
   

         const {setCart:x}= useContext(cartContext)


    async function addProductToCart(id) {
        const {data}=await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{
            id
        },{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        x(data?.id)
        console.log(data);
        toast.success(data.message,{
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        console.log(data);
    }



    const {setCart}= useContext(cartContext)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const {id}= useParams()
    const [productDetails, setProductDetails]= useState({})
    const [isLoding, setIsLoding]=useState(false)

    async function getSpecificDetails() {
        setIsLoding(true)
        const {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/products/'+id)
        setProductDetails(data.data);
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


             <Slider {...settings}>
              {productDetails.images?.map((img,index)=>{
              return <div key={index}>
               <img src={img}className='w-100' alt="" />
               </div>
              })}          
           </Slider>
                </div>
                <div className="col-md-9">
                    <h2 className='mt-2'>{productDetails?.title}</h2>
                    <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                    <p className='mt-2'>{productDetails?.description}</p>
                    <p className='d-flex justify-content-between mt-2'>
                        <span>{productDetails?.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            <span>{productDetails?.ratingsAverage}</span>
                        </span>
                    </p>
                    <button onClick={()=>{addProductToCart(data.id)}} className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>

                </div>

            </div>
                
                }
        </>



    )
}

export default ProductDetails