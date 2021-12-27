import Index from '../views/Index.vue'
import {RouteRecordRaw} from 'vue-router'
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
]

export {routes}