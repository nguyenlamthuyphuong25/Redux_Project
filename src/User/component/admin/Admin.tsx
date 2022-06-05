import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, fetchImages } from '../../../firestore-config'
import { AppState } from '../../store/store'
import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from 'react-icons/fa'
import './Admin.css'
import Modal from 'react-modal'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../firestore-config'
import { async } from '@firebase/util'
import { clearCart } from '../../slices/UserSlice'

export const Admin: React.FC = () => {
  const imagesListRef = ref(storage, 'Images/')
  //   let subtitle: any
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [modalIsOpen1, setIsOpen1] = React.useState(false)
  const [imageUpload, setImageUpload] = useState<any>(null)
  const [newName, setNewName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [newImgName, setNewImgName] = useState<string>('')
  const [isRender, setRender] = useState<boolean>(false)
  const [updateId, setUpdateId] = useState<string>('')
  const [updateName, setUpdateName] = useState<string>('')
  const [updatePrice, setUpdatePrice] = useState<number>(0)
  const [updateQuantity, setUpdateQuantity] = useState<number>(0)
  const [inputSearch, setInputSearch] = useState('')

  const updateProduct = async (
    id: string,
    name: string,
    price: number,
    quantity: number,
  ) => {
    const userDoc = doc(db, 'Items', id)
    const newUpdateFields = { name: name, price: price, quantity: quantity }
    await updateDoc(userDoc, newUpdateFields)
    setRender(!isRender)
    closeModal1()
  }

  const createProduct = async () => {
    try {
      await addDoc(itemCollectionRef, {
        name: newName,
        price: Number(price),
        imgName: newImgName,
        quantity: quantity,
      })
    } catch (err) {
      console.log(err)
    }
    uploadFile()
    setRender(!isRender)
    closeModal()
  }

  const deleteProduct = async (id: string) => {
    const userDoc = doc(db, 'Items', id)
    await deleteDoc(userDoc)
    setRender(!isRender)
  }

  // function up hình
  const uploadFile = () => {
    console.log(imageUpload)
    setNewImgName(imageUpload.name)
    if (imageUpload === null) return

    const imageRef = ref(storage, `Images/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log('imageUpload' + imageUpload.name)
    })
  } // kết thúc của function up hình

  const openModal: any = () => {
    setIsOpen(true)
  }

  const openModal1: any = (props: any) => {
    setUpdateId(props.id)
    setUpdateName(props.name)
    setUpdatePrice(props.price)
    setUpdateQuantity(props.quantity)
    setIsOpen1(true)
  }

  const afterOpenModal: any = () => {
    // subtitle.style.color = '#f00'
  }

  const afterOpenModal1: any = () => {
    // subtitle.style.color = '#f00'
  }

  const closeModal: any = () => {
    setIsOpen(false)
  }

  const closeModal1: any = () => {
    setIsOpen1(false)
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
  }, [isRender])

  return (
    <Fragment>
      <table className="admin-table">
        <caption>
          <button
            onClick={openModal}
            id="admin-table-create-modalbox"
            className="admin-table-create"
          >
            + Create
          </button>
          <input
            onChange={(e: any) => setInputSearch(e.target.value)}
            className="admin-search-cart-name"
            placeholder="Search..."
          />
        </caption>
        <thead className="admin-table-head">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>quantity</th>
            <th>Price</th>
            <th colSpan={2}>Operation</th>
          </tr>
        </thead>
        {items
          .filter((item: any) => {
            if (inputSearch == '') {
              return item
            } else if (
              item.name.toLowerCase().includes(inputSearch.toLowerCase())
            ) {
              return item
            }
          })
          .map((item: any, index: number) => {
            return (
              <tbody className="admin-table-body" key={index}>
                <tr>
                  <td>
                    <img className="admin-table-img" src={item.imgUrl} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} $</td>
                  <td className="admin-icon">
                    <FaRegEdit
                      onClick={() => {
                        openModal1({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: item.quantity,
                        })
                      }}
                    />
                  </td>
                  <td className="admin-icon">
                    <FaRegTrashAlt
                      onClick={() => {
                        deleteProduct(item.id)
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            )
          })}
      </table>
      <Modal
        className="admin-modal-container"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <button className="admin-modal-button-close" onClick={closeModal}>
          x
        </button>

        <label className="admin-modal-label" htmlFor="admin-modal-name">
          Name
        </label>
        <input
          onChange={(event: any) => {
            setNewName(event.target.value)
            console.log(newName)
          }}
          className="admin-modal-content"
          type="text"
          id="admin-modal-name"
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-price">
          Price
        </label>
        <input
          onChange={(event: any) => {
            setPrice(Number(event.target.value))
          }}
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-price"
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-price">
          Quantity
        </label>
        <input
          onChange={(event: any) => {
            setQuantity(Number(event.target.value))
          }}
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-price"
        />

        <br />

        <input
          type="file"
          id="admin-modal-imgURL"
          onChange={(event: any) => {
            setNewImgName(event.target.files[0].name)
            setImageUpload(event.target.files[0])
            console.log(event.target.files[0].name)
          }}
        />
        <button className="admin-modal-button-create" onClick={createProduct}>
          Create
        </button>
      </Modal>

      <Modal
        className="admin-modal-container admin-modal-container-2"
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
      >
        <button className="admin-modal-button-close" onClick={closeModal1}>
          x
        </button>

        <label className="admin-modal-label" htmlFor="admin-modal-name">
          Name
        </label>
        <input
          onChange={(event: any) => {
            setUpdateName(event.target.value)
            console.log(updateName)
          }}
          className="admin-modal-content"
          type="text"
          id="admin-modal-name"
          value={updateName}
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-price">
          Price
        </label>
        <input
          onChange={(event: any) => {
            setUpdatePrice(Number(event.target.value))
          }}
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-price"
          value={updatePrice}
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-price">
          Quantity
        </label>
        <input
          onChange={(event: any) => {
            setUpdateQuantity(Number(event.target.value))
          }}
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-price"
          value={updateQuantity}
        />

        <br />

        <button
          className="admin-modal-button-create"
          onClick={() => {
            updateProduct(updateId, updateName, updatePrice, updateQuantity)
          }}
        >
          Update
        </button>
      </Modal>
    </Fragment>
  )
}
