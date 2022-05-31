import React from 'react'
import { useState } from 'react'

import './App.css'
import { Carts } from './User/component/Carts'

import { Products } from './User/component/Products'

function App() {
  return (
    <div>
      <Products />
      <Carts />
    </div>
  )
}

export default App
