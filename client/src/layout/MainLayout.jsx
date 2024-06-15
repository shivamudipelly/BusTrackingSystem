import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';

import '../css/navbar.css';

export default function MainLayout() {
  return (
    <>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        
    </> 
  )
}
