import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/store'
import { db, storage, fetchImages } from '../../firestore-config'
import { ICartItem } from '../model/cart-model'
import { collection, getDocs } from 'firebase/firestore'
import { increaseQuantity, decreaseQuantity, delCart } from '../slices/UserSlice'

export const Carts: React.FC = () => {
    const [items, setItems] = useState<any>([])
    const itemCollectionRef = collection(db, 'Items')
    const cart = useSelector((state: AppState) => state.users.cart)
    const dispatch = useDispatch()

    useEffect(() => {
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

    const result = cart.reduce(
        (total, currentValue) =>
          (total = total + currentValue.price * currentValue.quantity),
        0,
    )

    return (
        <>
          <table>
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
                    <td> {item.name} </td>
                    <td> quantity: {item.quantity} </td>
                    <td> price: {item.price * item.quantity}$ </td>
    
                    <td>
                      <button onClick={() => dispatch(decreaseQuantity(index))}>-</button>
                      {item.quantity}
                      <button onClick={() => dispatch(increaseQuantity(index))}>+</button>
                    </td>
                    <td>
                      <button onClick={() => dispatch(delCart(index))}>x</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
    
          <div>
            <h1>Total : {result}$</h1>
          </div>
        </>
    )
}