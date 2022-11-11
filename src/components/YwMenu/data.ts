const routerData = [
    {
        path: '/3DModel',
        name: '3DModel',
        // component: () => import('@/view/portal/index'),
        meta: {
            title: '3D Model',
            icon: 'icon-menhu',
        },
        children: [
            {
                path: '/model',
                name: 'model',
                meta: {
                    title: 'Models',
                },
            },
            {
                path: '/material',
                name: 'material',
                meta: {
                    title: 'Materials',
                },
            },
            {
                path: '/pattern',
                name: 'pattern',
                meta: {
                    title: 'Models',
                },
            },
            {
                path: '/button',
                name: 'button',
                meta: {
                    title: 'Buttons',
                },
            },
            {
                path: '/zipper',
                name: 'zipper',
                meta: {
                    title: 'Zippers',
                },
            },
        ],
    },

    {
        path: '/imageGallery',
        name: 'imageGallery',
        meta: {
            title: 'ImageGallery',
            icon: 'icon-jiancekeshihua',
        },
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: 'User',
            icon: 'icon-zhihuitiaodukeshihua',
        },
    },
    {
        path: '/order',
        name: 'order',
        meta: {
            title: 'Order',
            icon: 'icon-zhihuitiaodukeshihua',
        },
    },
]

export default routerData
