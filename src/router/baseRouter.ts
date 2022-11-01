const baseRouter = [
    {
        path: '/',
        name: '页面1标题',
        component: () => import('@/view/template/index'),
        meta: {
            title: '',
        },
    },
]

export default baseRouter
