const routerData = [
    {
        path: '/portal',
        name: 'portal',
        // component: () => import('@/view/portal/index'),
        meta: {
            title: '门户',
            icon: 'icon-menhu',
        },
        children: [
            {
                path: '/portal',
                name: 'portal',
                meta: {
                    title: '门户',
                },
            },
        ],
    },
    {
        path: '/device',
        name: 'device',
        meta: {
            title: '消防设备管理',
            icon: 'icon-xiaofangshebeiguanli',
        },
        children: [
            {
                path: '/device',
                name: 'device',
                meta: {
                    title: '设备概览',
                    icon: 'icongerenzhongxin',
                },
            },
        ],
    },
    {
        path: '/back',
        name: 'back',
        meta: {
            title: '后台管理',
            icon: 'icon-houtaiguanli',
        },
        children: [
            {
                path: '/resource',
                name: 'resource',
                meta: {
                    title: '资源配置',
                    icon: 'icon-ziyuanpeizhi',
                },
                children: [
                    {
                        path: '/tunnel',
                        name: 'tunnel',
                        meta: {
                            title: '隧道',
                        },
                    },
                    {
                        path: '/streetcar',
                        name: 'streetcar',
                        meta: {
                            title: '有轨电车',
                        },
                    },
                ],
            },
            {
                path: '/plan',
                name: 'plan',
                meta: {
                    title: '预案配置',
                    icon: 'icon-ziyuanpeizhi',
                },
            },
        ],
    },
    {
        path: '/monitor',
        name: 'monitor',
        meta: {
            title: '监测可视化',
            icon: 'icon-jiancekeshihua',
        },
    },
    {
        path: '/schedule',
        name: 'schedule',
        meta: {
            title: '指挥调度可视化',
            icon: 'icon-zhihuitiaodukeshihua',
        },
    },
]

export default routerData
