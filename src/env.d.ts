/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_ENV: 'dev' | 'prod'
  BASE_URL: string
  VITE_FIREBASE_apiKey: string
  VITE_FIREBASE_authDomain: string
  VITE_FIREBASE_databaseURL: string
  VITE_FIREBASE_projectId: string
  VITE_FIREBASE_storageBucket: string
  VITE_FIREBASE_messagingSenderId: string
  VITE_FIREBASE_appId: string
  VITE_FIREBASE_measurementId: string
}
