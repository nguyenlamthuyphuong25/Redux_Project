import { useState, useEffect, useContext, FC } from 'react'
import { db, storage, fetchImages } from '../../firestore-config'
import { ref, getDownloadURL } from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'
import { addToCart } from '../slices/UserSlice'
import { AppState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { ICartItem } from '../model/cart-model'

export const Products: React.FC = () => {
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()

  const show = () => {
    var tempCart: ICartItem[] = cart
    for (var c of tempCart) {
      console.log(c.name)
    }
  }

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

  return (
    <>
      {items.length > 0 &&
        items.map((item: any) => {
          return (
            <div>
              <h3>{item.name} </h3>
              <h3>{item.price}$ </h3>
              <img className="CartImg" src={item.imgUrl} alt="shop img" />
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      name: item.name,
                      imgName: item.imgName,
                      id: item.id,
                      imgURL: item.imgUrl,
                      price: item.price,
                    }),
                  )
                }}
              >
                Add User
              </button>
              <button onClick={show}> show </button>
            </div>
          )
        })}
    </>
  )
}
