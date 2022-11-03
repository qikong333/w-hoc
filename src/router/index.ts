import { createRouter, createWebHashHistory } from 'vue-router'
import baseRouter from './baseRouter'
import cmsRouter from './cms'

const routes = [...baseRouter, ...cmsRouter]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
// 1. 每个条件执行后都要跟上 next() 或 使用路由跳转 api 否则页面就会停留一动不动
// 2. 要合理的搭配条件语句，避免出现路由死循环。
//   const token = cookies.get('token')
//   if (to.meta.auth) {
//   	if (!token) {
//   		return router.replace({
// 	      name: 'login'
// 	    })
//   	}
//   	next()
//   } else {
//     next()
//   }
// })
export default router
