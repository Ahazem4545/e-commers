import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategoriesSlider() {
const[categories , setCategories] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
      };

       function getAllCategories() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
      }


      const {data}= useQuery('categories',getAllCategories)
      console.log(data);
  return (
    <Slider {...settings}>
             {data?.data.data.map((category , index)=>{
                return <div key={index} className='mt-5 mb-5'>
                    <img style={{height:200}} src={category?.image} className='w-100' alt="" />
                    <h5>{category?.name}</h5>

                </div>
             })}
                      
           </Slider>
  )
}
