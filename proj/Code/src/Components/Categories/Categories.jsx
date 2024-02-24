import axios from 'axios';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Categories() {




function getAllCategories() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
  }

const {data , isFetched,isLoading,refetch}= useQuery('categories',getAllCategories,{
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
    {data?.data.data.map((category,index)=>{
      return <Link to={'/categoriesDetails/'+ category._id} key={index} className="col-md-3 mt-5">
      <img style={{height:200}} src={category?.image} className='w-100' alt="" />
      <h5>{category?.name}</h5>

      </Link>

    }) }
  </div>
    
  </>
  
}
