import { collection, getDocs } from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, fetchImages } from '../../../firestore-config'
import { AppState } from '../../store/store'
import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from 'react-icons/fa'
import './Admin.css'
import Modal from 'react-modal'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../firestore-config'

export const Admin: React.FC = () => {
  const imagesListRef = ref(storage, 'Images/')
  let subtitle: any
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [imageUpload, setImageUpload] = useState<any>(null)

  const uploadFile = async () => {
    console.log(imageUpload)
    if (imageUpload === null) return

    const imageRef = ref(storage, `Images/${imageUpload.name}`)
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert('complete')
    })
  }

  const openModal: any = () => {
    setIsOpen(true)
  }

  const afterOpenModal: any = () => {
    // subtitle.style.color = '#f00'
  }

  const closeModal: any = () => {
    setIsOpen(false)
    console.log()
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
        </caption>
        <thead className="admin-table-head">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th colSpan={2}>Operation</th>
          </tr>
        </thead>
        {items.map((item: any, index: number) => {
          return (
            <tbody className="admin-table-body" key={index}>
              <tr>
                <td>
                  <img className="admin-table-img" src={item.imgUrl} />
                </td>
                <td>{item.name}</td>
                <td>{item.price} $</td>
                <td className="admin-icon">
                  <FaRegEdit />
                </td>
                <td className="admin-icon">
                  <FaRegTrashAlt />
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
          className="admin-modal-content"
          type="text"
          id="admin-modal-name"
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-price">
          Price
        </label>
        <input
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-price"
        />
        <br />
        <label className="admin-modal-label" htmlFor="admin-modal-imgName">
          Image Name
        </label>
        <input
          className="admin-modal-content"
          type="text"
          id="admin-modal-imgName"
        />
        <input
          type="file"
          id="admin-modal-imgURL"
          onChange={(e: any) => {
            setImageUpload(e.target.files[0])
            console.log(imageUpload)
          }}
        />
        <button className="admin-modal-button-create" onClick={uploadFile}>
          Create
        </button>
      </Modal>
    </Fragment>
  )
}
