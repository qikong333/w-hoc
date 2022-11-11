const baseRouter = [
    {
        path: '/',
        name: '页面1标题',
        component: () => import('@/view/template/index'),
        meta: {
            title: '',
        },
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('@/view/login/index.vue'),
        meta: {
            title: '',
        },
    },
]

export default baseRouter
