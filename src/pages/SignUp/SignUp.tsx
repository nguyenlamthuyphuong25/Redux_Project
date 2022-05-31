import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import './SignUp.css'

export default function SignUp(): any {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    setUsername('')
    setPassword('')
    setName('')
  }

  return (
    <div className="wrap-container">
      <div className="left">
        <h1>Login</h1>
        <p>This is our furniture shop, Hope you will enjoy it</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="right">
          <input
            value={name}
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button className='button-signup'>Sign up</button>
          <div>{/* Have an account, <Link to="/">Sign in</Link> here */}</div>
        </div>
      </form>
    </div>
  )
}
