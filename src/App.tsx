import React, { useEffect } from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomeAdmin from './pages/Home/HomeAdmin'
import HomePage from './pages/Home/HomePage'
import { Login } from './pages/Login/Login'
import { Carts } from './User/component/Carts'
import { Header } from './User/component/header/Header'
import { NavBar } from './User/component/nav_bar/NavBar'
import { ProtectedRoute } from './User/component/Route/ProtectedRoute'

import { Products } from './User/component/Products'

function App() {
  const [isAuth, setAuth] = useState(
    localStorage.getItem('user') !== null ? true : false,
  )

  // useEffect(() => {
  //   if (localStorage.getItem('user') !== null) {
  //     setAuth(true)
  //   } else {
  //     setAuth(false)
  //   }
  //   console.log('isAuth 1: ' + isAuth)
  // }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              children={<HomeAdmin />}
            ></ProtectedRoute>
          }
        />
        {/* <Route path="/admin" element={<HomeAdmin />} /> */}
        <Route path="/carts" element={<Carts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
