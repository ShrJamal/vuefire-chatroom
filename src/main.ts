import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from 'store/index'
import '~/assets/main.css'
import 'uno.css'

createApp(App).use(pinia).use(router).mount('#app')
