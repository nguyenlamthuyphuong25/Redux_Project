import './NavBar.css'
import { ImSearch } from 'react-icons/im'
import { BiCartAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export const NavBar: React.FC = () => {
  return (
    <div className="NavbarItems">
      <h1 className="navbar-logo">SHPX</h1>

      <nav>
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a className="nav-link" href="/AboutUs">
              About Us
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
        <span><ImSearch /></span>

        <span><Link to="/carts">
          <BiCartAlt className='nav-icon-shopping'></BiCartAlt>
        </Link></span>

        <span><Link className='login-button' to="/login">Login</Link></span>
      </div>
    </div>
  )
}
