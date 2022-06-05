import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/store'
import { db, storage, fetchImages } from '../../firestore-config'
import { ICartItem } from '../model/cart-model'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import {
  increaseQuantity,
  decreaseQuantity,
  delCart,
} from '../slices/UserSlice'
import './Carts.css'
import { Link } from 'react-router-dom'

export const Carts: React.FC = () => {
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const getItems = async () => {
  //     const data = await getDocs(itemCollectionRef)
  //     var tmpItems: any = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))

  //     for (var item of tmpItems) {
  //       console.log('GET IMAGE FOR ' + item.name)
  //       var imgUrl = await fetchImages(`Images/${item.imgName}`)
  //       item.imgUrl = imgUrl
  //     }
  //     setItems(tmpItems)
  //     console.log(tmpItems)
  //   }
  //   getItems()
  // }, [])

  const result = cart.reduce(
    (total, currentValue) =>
      (total = total + currentValue.price * currentValue.quantity),
    0,
  )

  const itemCount = cart.reduce(
    (total, currentValue) => (total = total + currentValue.quantity),
    0,
  )

  const handleCheckOut = async () => {
    for (var item of cart) {
      const userDoc = doc(db, 'Items', item.id)
      var qty = item.totalQuantity - item.quantity
      if (qty === 0) {
        deleteDoc(userDoc)
      }
      const newUpdateFields = { quantity: qty }
      await updateDoc(userDoc, newUpdateFields)
      console.log(userDoc)
    }
  }

  return (
    <div>
      <h1 className="shoping-cart-header">Shopping Cart</h1>
      <div id="shopping-cart-modal" className="shopping-cart-container">
        <table className="shopping-cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          {cart.map((item: any, index) => {
            return (
              <tbody className="Bill_Container" key={index}>
                <tr className="Bill_Items">
                  <td>
                    <img
                      className="BilItemImg"
                      src={item.imgUrl}
                      alt="shop img"
                    />
                  </td>
                  <td className="shopping-cart-item-name"> {item.name} </td>
                  <td>
                    <button
                      className="decrease-button button"
                      onClick={() => dispatch(decreaseQuantity(index))}
                    >
                      -
                    </button>
                    {item.quantity} : {item.totalQuantity}
                    <button
                      className="increase-button button"
                      onClick={() => dispatch(increaseQuantity(index))}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price * item.quantity}$ </td>

                  <td>
                    <button
                      className="del-button"
                      onClick={() => dispatch(delCart(index))}
                    >
                      x
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>

        <div className="shopping-cart-bill-container">
          <h1 className="shopping-cart-bill-checkout-title">Order Summary</h1>
          <div className="shopping-cart-bill">
            <div className="shopping-cart-bill-item">
              <h4>{itemCount} ITEMS</h4>
              <h4>{result} $</h4>
            </div>
            <div className="shopping-cart-bill-shipping">
              <h4>SHIPPING</h4>
              <h4>{Math.round(result / 500)} $</h4>
            </div>
            <div className="shopping-cart-bill-total">
              <h4>TOTAL COST </h4>
              <h4>{result + Math.round(result / 500)} $</h4>
            </div>
            <br />
          </div>
          <button
            className="shopping-cart-bill-checkout"
            onClick={handleCheckOut}
          >
            <Link to="/">CHECK OUT</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
