import layout from '@/layout'

const cmsRouter = [
    {
        path: '/3d',
        name: 'DesignView',
        component: layout,
        meta: {
            title: '',
        },
        children: [
            {
                path: '/Material',
                name: 'Material',
                // component: () => import('@/view/template/index'),
                meta: {
                    title: '',
                },
            },
            {
                path: '/Pattern',
                name: 'Pattern',
                // component: () => import('@/view/template/index'),
                meta: {
                    title: '',
                },
            },
            {
                path: '/Botton',
                name: 'Botton',
                // component: () => import('@/view/template/index'),
                meta: {
                    title: '',
                },
            },
            {
                path: '/Zipper',
                name: 'Zipper',
                // component: () => import('@/view/template/index'),
                meta: {
                    title: '',
                },
            },
        ],
    },
]

export default cmsRouter
