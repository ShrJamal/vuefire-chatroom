import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, doc } from 'firebase/firestore'
import 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
