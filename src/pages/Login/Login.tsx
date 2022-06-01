import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { Link } from 'react-router-dom'
import './Login.css'
import jwt_decode from 'jwt-decode'

export const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    setUsername('')
    setPassword('')
  }
  const login = () => {
    axios
      .post('https://localhost:7138/login ', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log('here   ' + res.data)
        var decoded: any = jwt_decode(res.data)

        console.log(decoded.role)
        console.log(decoded)
        localStorage.setItem('user', decoded.role)
        navigate('/')
      })
  }

  return (
    <div className="wrap-container">
      <div className="left">
        <h1>Login</h1>
        <p>This is our furniture shop, Hope you will enjoy it</p>
      </div>

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
        <button onClick={login} className="button-signin">
          Sign in
        </button>
        <div>{/* No account, <Link to="/signup">Sign Up</Link> here */}</div>
      </div>
    </div>
  )
}
