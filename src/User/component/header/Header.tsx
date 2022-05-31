import shopImg from './shop.jpg'
import './Header.css'

export const Header: React.FC = () => {

  return (
    <div className="header_container">
      <div className="header_txt">
        <h1>
          Modern Interior for your <br /> Dream House
        </h1>
        <p>We custom make design to suits your needs.</p>
        </div>
      <img className="Img" src={shopImg} alt="shop image" />
    </div>
  )
}
 
