import axios from 'axios';
import Product from '../Product/Product';
import { useQuery } from 'react-query';

export default function Products() {




function getAllProgucts() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/products')
  }

const {data , isFetched,isLoading,refetch}= useQuery('products',getAllProgucts,{
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
  {/* <button className='btn btn-dark mt-5' onClick={refetch}>Refetch</button> */}
  <div className="row mt-5">
    {data?.data.data.map((product)=>{
      return <div key={product.id} className="col-md-3">
        <Product product={product} />

      </div>

    }) }
  </div>
    
  </>
  
}
