import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFEUP47pGx1qi2OEOu4bmRxLXpBB1Re5s",
  authDomain: "furniture-shop-9336a.firebaseapp.com",
  projectId: "furniture-shop-9336a",
  storageBucket: "furniture-shop-9336a.appspot.com",
  messagingSenderId: "188927942369",
  appId: "1:188927942369:web:956f025e9173adc12de1a0",
  measurementId: "G-SMPWD9YPF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app);

export const fetchImages = async (filename: string) => {
  var imgRef = ref(storage, filename)
  return await getDownloadURL(imgRef).then((url) => {
    return url
  })
}