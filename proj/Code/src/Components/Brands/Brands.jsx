import React from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Brands() {




function getAllBrands() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/brands')
  }

const {data , isFetched,isLoading,refetch}= useQuery('brands',getAllBrands,{
  cacheTime:20000,
  staleTime:5000,
  refetchInterval:300000,
  // refetchOnMount:false,
  // refetchOnWindowFocus:false,
  // refetchIntervalInBackground:false,
  // onSuccess:()=>{
  //   console.log(data);
  // }
})
 console.log(data);
 
  return <>
  <div className="row mt-5">
    {data?.data.data.map((brand,index)=>{
      return <Link to={'/brandsDetails/'+ brand._id} key={index} className="col-md-3 mt-5">
      <img style={{height:200}} src={brand?.image} className='w-100' alt="" />
      <h5>{brand?.name}</h5>

      </Link>

    }) }
  </div>
    
  </>
  
}


