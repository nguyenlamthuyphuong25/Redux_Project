import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import { Carts } from './User/component/Carts'
import { Header } from './User/component/header/Header'
import { NavBar } from './User/component/nav_bar/NavBar'

import { Products } from './User/component/Products'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carts" element={<Carts />} />
      </Routes>
    </div>
  )
}

export default App
