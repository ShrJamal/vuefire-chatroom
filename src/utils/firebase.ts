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

export const auth = firebase.auth()
export const db = firebase.firestore()

export type Unsubscribe = firebase.Unsubscribe
