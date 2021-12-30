import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../src/assets/index.scss'
import 'element-plus/dist/index.css'
import i18n from './i18n'
//import 'element-theme-dark';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

let app = createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(ElementPlus)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')


