import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Address from './Components/Address/Address';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoure from './Components/ProtectedRoute/ProtectedRoure';
import AuthProtedctedRoute from './Components/ProtectedRoute/AuthProtedctedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Orders from './Components/Orders/Orders';
import CartContextProvider from './Context/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CategoriesDetails from './Components/CategoriesDetails/CategoriesDetails';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';

function App() {
  const queryClient= new QueryClient()
  const router = createBrowserRouter([{
    path:'', element:<Layout/>,children:[
      {path:'',element:<Navigate to={'home'}/>},
      
        {path:'login',element: <AuthProtedctedRoute> <Login/></AuthProtedctedRoute> },
      {path:'register',element: <AuthProtedctedRoute><Register/> </AuthProtedctedRoute>},


      {path:'home',element: <ProtectedRoure><Home/></ProtectedRoure> },
      {path:'allorders',element: <ProtectedRoure><Orders/></ProtectedRoure> },
      {path:'cart',element: <ProtectedRoure><Cart/></ProtectedRoure> },
      {path:'brandsDetails/:id',element: <ProtectedRoure><BrandsDetails/></ProtectedRoure> },
      {path:'brands',element: <ProtectedRoure><Brands/></ProtectedRoure> },
      {path:'products',element: <ProtectedRoure> <Products/></ProtectedRoure>},
      {path:'allOrders',element: <ProtectedRoure> <Orders/></ProtectedRoure>},
      {path:'address/:cartId',element: <ProtectedRoure><Address/></ProtectedRoure> },
      {path:'categories',element: <ProtectedRoure><Categories/></ProtectedRoure> },
      {path:'productDetails/:id',element: <ProtectedRoure><ProductDetails/></ProtectedRoure> },
      {path:'categoriesDetails/:id',element: <ProtectedRoure><CategoriesDetails/></ProtectedRoure> },


      {path:'*',element:<NotFound/>},
    ]
  }])

  return <>
<QueryClientProvider client={queryClient}>
  <AuthContextProvider>
   <CartContextProvider> 
 <RouterProvider router={router}></RouterProvider>
 </CartContextProvider>
</AuthContextProvider>
<ReactQueryDevtools position='bottom-right'/>
</QueryClientProvider>
<ToastContainer/>

  </>
}

export default App;