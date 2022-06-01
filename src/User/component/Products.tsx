import { useState, useEffect, useContext, FC } from 'react'
import { db, storage, fetchImages } from '../../firestore-config'
import { ref, getDownloadURL } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'
import { addToCart } from '../slices/UserSlice'
import { AppState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { ICartItem } from '../model/cart-model'
import { Link, useNavigate } from 'react-router-dom'

import { createBrowserHistory } from 'history'

export const Products: React.FC = () => {
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const navigate = useNavigate()

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
      <h1 className="product-title">Products</h1>
      {items.length > 0 &&
        items.map((item: any, index: number) => {
          return (
            <div className="product-items" key={index}>
              <img
                id="product-cart-img"
                className="CartImg"
                src={item.imgUrl}
                alt="shop img"
              />
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
              </div>
            </div>
          )
        })}
    </>
  )
}
