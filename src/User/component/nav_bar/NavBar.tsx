import './NavBar.css'
import { ImSearch } from 'react-icons/im'
import { BiCartAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const NavBar: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [showSearchbtn, setShowSearchbtn] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setIsLogin(true)
      console.log(isLogin)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
  }
  

  return (
    <div className="NavbarItems">
      <h1 className="navbar-logo">SHPX</h1>
      <nav className='navbar-container'>
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a className="nav-link" href="/AboutUs">
              About
            </a>
          </li>
          <li>
            <a className="nav-link" href="/Pricing">
              Product
            </a>
          </li>
          <li>
            <a className="nav-link" href="/Pricing">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="SearchNCart">

        <span>
          <Link to="/carts">
            <BiCartAlt className="nav-icon-shopping"></BiCartAlt>
          </Link>
        </span>

        {isLogin ? (
          <span onClick={logout}>
            <Link className="login-button" to="/login">
              Logout
            </Link>
          </span>
        ) : (
          <span>
            <Link className="login-button" to="/login">
              Login
            </Link>
          </span>
        )}
      </div>
    </div>
  )
}
