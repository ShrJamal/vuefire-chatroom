import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, doc } from 'firebase/firestore/lite'
import 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
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
