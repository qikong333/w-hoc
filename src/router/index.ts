import { createRouter, createWebHashHistory } from 'vue-router'
import baseRouter from './baseRouter'

const routes = baseRouter

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
