import { addDoc, collection, deleteDoc, getDocs, doc, DocumentReference, updateDoc } from 'firebase/firestore'
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

export const Admin: React.FC = () => {
  const imagesListRef = ref(storage, 'Images/')
  //   let subtitle: any
  const [items, setItems] = useState<any>([])
  const itemCollectionRef = collection(db, 'Items')
  const cart = useSelector((state: AppState) => state.users.cart)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [imageUpload, setImageUpload] = useState<any>(null)
  const [newName, setNewName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [newImgName, setNewImgName] = useState<string>('')

  const [show, setShow] = useState<boolean>(false)
  const [isRender, setRender] = useState<boolean>(false);

  const createProduct = async () => {
    try{
    await addDoc(itemCollectionRef, {
      name: newName,
      price: Number(price),
      imgName: newImgName,
      quantity: quantity,
      });
    } catch (err) {
      console.log(err)
    }
    uploadFile();
    setRender(!isRender);
    closeModal();
  };

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

  const afterOpenModal: any = () => {
    // subtitle.style.color = '#f00'
  }

  const closeModal: any = () => {
    setIsOpen(false)
  }

  const deleteProduct = async (id: any) => {
    const userDoc: any = doc(db, "Items", id);
    await deleteDoc(userDoc);
  };

  const updateProduct = async (id: string, name: string, quantity: number, price: number) => {
    const userDoc = doc(db, "Items", id);
    const newFields = {
      name: newName,
      price: price,
      quantity: quantity
    };
    await updateDoc(userDoc, newFields);
  };

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
        {items.map((item: any, index: number) => {
          return (
            <tbody className="admin-table-body" key={index}>
              <tr>
                <td>
                  <img className="admin-table-img" src={item.imgUrl} />
                </td>
                <td>{show ? <input style={{ color: "#000" }} onChange={(e) => setNewName(e.target.value)}/> : item.name }</td>
                <td>{show ? <input style={{ color: "#000" }} value={item.quantity} /> : item.quantity} </td>
                <td> {show ? <input style={{ color: "#000" }} value={item.price} /> : item.price } $</td>
                <td className="admin-icon">
                  <FaRegEdit key={index} onClick={() => setShow(!show) } />
                </td>
                <td className="admin-icon" onClick={() => deleteProduct(item.id)} >
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
          onChange={(event: any) => {
            setNewName(event.target.value)
            console.log(newName)
          }}
          className="admin-modal-content"
          type="text"
          id="admin-modal-name"
        />
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
        <label className="admin-modal-label" htmlFor="admin-modal-quantity">
          Quantity
        </label>
        <input
          onChange={(event: any) => {
            setQuantity(Number(event.target.value))
          }}
          className="admin-modal-content admin-modal-content-price"
          type="number"
          id="admin-modal-quantity"
        />
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
    </Fragment>
  )
}
