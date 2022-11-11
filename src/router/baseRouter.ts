import layout from '@/layout'

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
        name: 'login',
        component: () => import('@/view/login/index.vue'),
        meta: {
            title: '',
        },
    },
    {
        path: '/cms',
        name: 'layout',
        component: () => import('@/layout/index'),
        meta: {
            title: '',
        },
    },
]

export default baseRouter
