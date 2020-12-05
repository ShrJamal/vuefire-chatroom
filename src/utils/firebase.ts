import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

console.log('-----Init Firebase')

firebase.initializeApp({
  apiKey: 'AIzaSyBVmlPJX-lczjFemJ5R3kVJqgsFzqsPjFU',
  authDomain: 'clear-battery-251819.firebaseapp.com',
  databaseURL: 'https://clear-battery-251819.firebaseio.com',
  projectId: 'clear-battery-251819',
  storageBucket: 'clear-battery-251819.appspot.com',
  messagingSenderId: '982316439307',
  appId: '1:982316439307:web:f5b631952df1b313adb40e',
  measurementId: 'G-5QXFB0JBGP',
})

//--------- Auth -------------------------
export const auth = firebase.auth()
export type Unsubscribe = firebase.Unsubscribe

//--------- Firestore -------------------------
export type DocSnapshot = firebase.firestore.QueryDocumentSnapshot
export type DocumentData = firebase.firestore.DocumentData
export type Timestamp = firebase.firestore.Timestamp
export type FieldValue = firebase.firestore.FieldValue

export const db = firebase.firestore()
export const usersCol = db.collection('users')
export const chatCol = db.collection('chatroom')

//---------------------------------------------
