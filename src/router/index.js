import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/management',
        name: 'Management',
        component: () =>
            import ('../views/Management.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router