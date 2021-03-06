import { useState, useEffect, useContext, FC } from 'react'
import { db, storage, fetchImages } from '../../firestore-config'
import { ref, getDownloadURL } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'
import { addToCart } from '../slices/UserSlice'
import { AppState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { ICartItem } from '../model/cart-model'
import { Link, useNavigate } from 'react-router-dom'
import './Products.css'

export const Products: React.FC = () => {
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const navigate = useNavigate()
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    setIsLogin(false)
    console.log(isLogin)
    const getItems = async () => {
      const data = await getDocs(itemCollectionRef)
      var tmpItems: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      for (var item of tmpItems) {
        console.log('GET IMAGE FOR ' + item.name)
        var imgUrl = await fetchImages(`Images/${item.imgName}`)
        item.imgUrl = imgUrl
      }
      setItems(tmpItems)
      console.log(tmpItems)
    }
    getItems()
  }, [])

  const hnadleAddToCart = (item: any) => {
    if (localStorage.getItem('user') !== null) {
      console.log(isLogin)
      dispatch(
        addToCart({
          name: item.name,
          imgName: item.imgName,
          id: item.id,
          imgURL: item.imgUrl,
          price: item.price,
          quantity: item.quantity,
        }),
      )
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <div className='product-title-search-container'>
        <h1 className="product-title">Products</h1>
        <input onChange={(e: any) => setInputSearch(e.target.value)} className="product-search-cart" placeholder='Search...' />
      </div>
      {items.length > 0 &&
        items.filter((item: any) => {
          if (inputSearch == "") {
            return item
          } else if (item.name.toLowerCase().includes(inputSearch.toLowerCase())) {
            return item
          }
        }).map((item: any, index: number) => {
          return (
            <div className="product-items" key={index}>
              <div className="product-cart-info-img">
                <img
                  id="product-cart-img"
                  className="CartImg"
                  src={item.imgUrl}
                  alt="shop img"
                />
              </div>
              <div className="product-cart-info">
                <h3>{item.name} </h3>
                <h4>{item.price}$ </h4>
                
                <button
                  className="add-to-cart"
                  onClick={() => {
                    hnadleAddToCart(item)
                  }}
                >
                  Add
                </button>
                <h4 className='product-cart-repo'>Store: {item.quantity}</h4>
              </div>
            </div>
          )
        })}
    </>
  )
}
