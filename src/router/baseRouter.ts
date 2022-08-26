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
        path: '/map',
        name: '地图例子',
        component: () => import('@/view/map/index'),
    },
    {
        path: '/mapbox',
        name: '地图例子2',
        component: () => import('@/view/mapbox/index'),
    },
    {
        path: '/tools/router',
        name: '权限菜单编辑器',
        component: () => import('@/tools/router/index'),
    },
    {
        path: '/tools/formCreat',
        name: '表单编辑器',
        component: () => import('@/tools/formCreat/index'),
    },
    {
        path: '/threejs',
        name: '3d',
        component: () => import('@/threejs/index'),
    },
    {
        path: '/gui',
        name: 'gui',
        component: () => import('@/threejs/GUI/index.vue'),
    },
]

export default baseRouter
