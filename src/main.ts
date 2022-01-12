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
import Task from './views/Tasks/Task.vue'
import Subtask from './views/Tasks/Subtask.vue'
//import 'element-theme-dark';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

let app = createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(ElementPlus)



app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component('task', Task)
app.component('subtask', Subtask)
app.mount('#app')



