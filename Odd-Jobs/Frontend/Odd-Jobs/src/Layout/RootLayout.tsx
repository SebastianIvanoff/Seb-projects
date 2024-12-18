import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const RootLayout = () => {
  return (
    <>
    <Navbar />
    <div className='container'>
        <Outlet />
    </div>
    </>
  )
}

export default RootLayout