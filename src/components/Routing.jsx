import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import ForgetPassword from '../Auth/ForgetPassword'
import ProductDetails from '../pages/ProductDetails'
import ShowDetails from '../pages/ShowDetails'
import { useAuth } from '../context/Auth'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/showdetails/:category' element={<ShowDetails/>}/>
      </Routes>
    </>
  )
}

export default Routing
