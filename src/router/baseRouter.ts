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
        path: '/Home',
        name: '页面12',
        component: () => import('@/components/HelloWorld.vue'),
    },
    {
        path: '/tools/router',
        name: '权限菜单编辑器',
        component: () => import('@/tools/router/index'),
    },
]

export default baseRouter
