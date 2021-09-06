import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, doc } from 'firebase/firestore/lite'
import 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
  measurementId: import.meta.env.VITE_FIREBASE_measurementId,
})

//--------- Auth -------------------------
export const auth = getAuth()
// export type Unsubscribe = firebase.Unsubscribe

//--------- Firestore -------------------------

export const db = getFirestore()
export const usersCol = collection(db, 'users')
export const userDoc = (id: string) => doc(db, 'users', id)
export const chatCol = collection(db, 'chatroom')
export const chatDoc = (id: string) => doc(db, 'chatroom', id)

//---------------------------------------------
