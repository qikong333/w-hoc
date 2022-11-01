import { createRouter, createWebHashHistory } from 'vue-router'
import baseRouter from './baseRouter'
import cmsRouter from './cms'

const routes = [...baseRouter, ...cmsRouter]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
