import React from 'react';
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import {  authContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
export default function Navbar() {
  const {isUserLoggedIn,setUserLoggedIn} =useContext(authContext)
  const {cart} =useContext(cartContext)
console.log(cart);
  const navigate = useNavigate()
function LogOut() {
  setUserLoggedIn(false)
  localStorage.removeItem('token')
  navigate('/login')
  
}

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <a className="navbar-brand">
          <img src={logo} alt="fresh cart logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isUserLoggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'home'} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'cart'} className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link  to={'products'} className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to={'categories'} className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
              <Link to={'brands'} className="nav-link">Brands</Link>
            </li>
            <li className="nav-item">
              <Link to={'allOrders'} className="nav-link">orders</Link>
            </li>
          </ul>}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
            <Link to={'/cart'} className="fa-solid fa-cart-shopping mx-2 position-relative">
              <span className='position-absolute top-0 start-100 translate-middle bg-success p-1 font-sm rounded-circle basket'>{cart?.numOfCartItems ||0}</span>
            </Link>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>

            
           {isUserLoggedIn ? <li className="nav-item">
              <span onClick={LogOut} className="nav-link cursor-pointer">Logout</span>
            </li> :
            <>
            <li className="nav-item">
                <Link  to={'login'} className="nav-link" >Login</Link>
              </li>
              <li className="nav-item">
                <Link to={'register'} className="nav-link">Register</Link>
              </li>
            </>}
            
          </ul>
        </div>
      </div>
    </nav>
  </>
}
