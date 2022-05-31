import React, { useState } from 'react'

// import { Link } from 'react-router-dom'
import './Login.css'

export const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    setUsername('')
    setPassword('')
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
            id="login-username"
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
          <button className='button-signin'>Sign in</button>
          <div>{/* No account, <Link to="/signup">Sign Up</Link> here */}</div>
        </div>
      </form>
    </div>
  )
}
