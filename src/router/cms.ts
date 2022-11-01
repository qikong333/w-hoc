import layout from '@/layout'

const cmsRouter = [
    {
        path: '/cms',
        name: 'DesignView',
        component: layout,
        meta: {
            title: '',
        },
        children: [
            {
                path: '/',
                name: '页面1标题',
                component: () => import('@/view/template/index'),
                meta: {
                    title: '',
                },
            },
        ],
    },
]

export default cmsRouter
