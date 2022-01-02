import Index from '../views/Index.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import CreateTask from '../views/Tasks/CreateTask.vue'
import {RouteRecordRaw} from 'vue-router'
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/task',
        name: 'CreateTask',
        component: CreateTask
    }
]

export {routes}