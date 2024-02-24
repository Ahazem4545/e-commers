import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { date } from 'yup';
import Product from '../Product/Product';
import img1 from '../../Assets/images/1.jpg'
import img2 from '../../Assets/images/2.jpg'
import img3 from '../../Assets/images/grocery-banner-2.jpeg'
import img4 from '../../Assets/images/grocery-banner.png'
import Slider from "react-slick";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { useQuery } from 'react-query';

export default function Home() {
  
const [products,setProducts] = useState([])
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

 async function getAllProgucts() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/products')
  }

const {data}= useQuery('products',getAllProgucts)
  return <>
  <header>
    <div className="row g-0 mt-5 pt-5">
      <div className="col-md-10">
      <Slider {...settings}>
             <div >
               <img src={img3}className='w-100' alt="" />
               
               </div>
             <div >
             <img src={img4}className='w-100' alt="" />
               
               </div>
                      
           </Slider>
          

      </div>
      <div className="col-md-2">
<img src={img1} className='w-100' alt="" />
<img src={img2}  className='w-100' alt="" />

      </div>
    </div>
     <CategoriesSlider/>
  </header>
  <div className="row">
    {data?.data.data.map((product)=>{
      return <div key={product.id} className="col-md-3">
        <Product product={product} />

      </div>

    }) }
  </div>
    
  </>
}
