// export const bgData = [
//     { url: import('@/threejs/img/bg/bg1.jpg') },
//     { url: import('@/threejs/img/bg/bg2.jpg') },
//     { url: import('@/threejs/img/bg/bg3.jpg') },
//     { url: import('@/threejs/img/bg/bg4.jpg') },
//     { url: import('@/threejs/img/bg/bg5.jpg') },
//     { url: import('@/threejs/img/bg/bg6.jpg') },
//     { url: import('@/threejs/img/bg/bg7.jpg') },
//     // {
//     //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic147.nipic.com%2Ffile%2F20171119%2F24969966_200008418034_2.jpg&refer=http%3A%2F%2Fpic147.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663836868&t=1d899252ad4699064c1f9f133fcee372',
//     //     name: '街景2',
//     // },
//     // {
//     //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic111.nipic.com%2Ffile%2F20160929%2F7788246_113922747000_2.jpg&refer=http%3A%2F%2Fpic111.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663836866&t=108517d8ab406fbfd3976759f2b4bf70',
//     //     name: '街景3',
//     // },
//     // {
//     //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic44.nipic.com%2F20140720%2F10076473_071808687000_2.jpg&refer=http%3A%2F%2Fpic44.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663836921&t=ddcd96c2e78b6a8e799218b787b756b0',
//     //     name: '街景4',
//     // },
//     // {
//     //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbig.justeasy.cn%2Feffect%2F202004%2F20200405101713_5e893fa95e7f1.jpg&refer=http%3A%2F%2Fbig.justeasy.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663837203&t=6202116cdcfdd0beab6cce7e333d8a07',
//     //     name: '室内1',
//     // },
//     // {
//     //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mao8zx.com%2Fd%2Ffile%2Fp%2F2019%2F10-15%2F431292691f055b720c3aee27ce0f9c3d.jpg&refer=http%3A%2F%2Fwww.mao8zx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663837379&t=b2c275f5d669c7d79ebf3b75eaecbdfc',
//     //     name: '室内2',
//     // },
//     // {
//     //     url: 'https://img0.baidu.com/it/u=1243075617,430461446&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
//     //     name: '室内3',
//     // },
//     // {
//     //     url: 'https://img0.baidu.com/it/u=4016900470,1099072708&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
//     //     name: '室内4',
//     // },
// ]

export const bgData = [
    { url: new URL('../img/bg/bg1.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg2.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg3.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg4.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg5.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg6.jpg', import.meta.url).href },
    { url: new URL('../img/bg/bg7.jpg', import.meta.url).href },
]

export const materialDatas = [
    {
        name: new URL('../img/m/39.jpeg', import.meta.url).href,
        url: 'src/threejs/img/maps/39/basecolor.webp',
    },
    {
        name: new URL('../img/m/40.jpeg', import.meta.url).href,
        url: 'src/threejs/img/maps/40/basecolor.webp',
    },
    {
        name: new URL('../img/m/47.jpeg', import.meta.url).href,
        url: 'src/threejs/img/maps/47/basecolor.webp',
    },
    {
        name: new URL('../img/m/55.jpeg', import.meta.url).href,
        url: 'src/threejs/img/maps/55/basecolor.webp',
    },
    // { name: import('@/threejs/img/m/39.jpg'), url: 'src/threejs/img/nMap.jpg' },
    // { name: import('@/threejs/img/m/40.jpg'), url: 'src/threejs/img/nMap.jpg' },
    // { name: import('@/threejs/img/m/39.jpg'), url: 'src/threejs/img/nMap.jpg' },
    // { name: import('@/threejs/img/m/39.jpg'), url: 'src/threejs/img/nMap.jpg' },
]

export const modelData = [
    {
        name: 434,
        model: {
            img: new URL('../assets/434/model/base.png', import.meta.url).href,
            glb: 'src/assets/434/model/base.glb',
        },
        maps: [
            {
                name: new URL('../assets/434/maps/1/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/434/maps/1/basecolor.webp',
            },
            {
                name: new URL('../assets/434/maps/2/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/434/maps/2/basecolor.webp',
            },
            {
                name: new URL('../assets/434/maps/3/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/434/maps/3/basecolor.webp',
            },
            {
                name: new URL('../assets/434/maps/4/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/434/maps/4/basecolor.webp',
            },
        ],
    },
    {
        name: 435,
        model: {
            img: new URL('../assets/435/model/base.png', import.meta.url).href,
            glb: 'src/assets/435/model/base.glb',
        },
        maps: [
            {
                name: new URL('../assets/435/maps/1/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/435/maps/1/basecolor.webp',
            },
            {
                name: new URL('../assets/435/maps/2/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/435/maps/2/basecolor.webp',
            },
            {
                name: new URL('../assets/435/maps/3/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/435/maps/3/basecolor.webp',
            },
            {
                name: new URL('../assets/435/maps/4/img.jpeg', import.meta.url)
                    .href,
                url: 'src/assets/435/maps/4/basecolor.webp',
            },
        ],
    },
]

export const uploadData = [
    {
        name: 'BODY-SR_FRONT_1784',
        value: '左袖',
        map: 'src/assets/imageUpload/zuo.png',
    },
    {
        name: 'BODY-SL_FRONT_1775',
        value: '右袖',
        map: 'src/assets/imageUpload/you.png',
    },
    {
        name: 'BODY-F_FRONT_1744',
        value: '前幅',
        map: 'src/assets/imageUpload/qian.png',
    },
    {
        name: 'BODY-B_FRONT_1753',
        value: '后幅',
        map: 'src/assets/imageUpload/hou.png',
    },
    // {
    //     name: 'RIB-COLLAR_FRONT_1805',
    //     value: '上领',
    // },
    // {
    //     name: 'RIB-B_FRONT_1769',
    //     value: '后底部',
    // },
    // {
    //     name: 'RIB-F_FRONT_1762',
    //     value: '前底',
    // },
    // {
    //     name: 'RIB-SL_FRONT_1793',
    //     value: '右袖口',
    // },
    // {
    //     name: 'RIB-SR_FRONT_1799',
    //     value: '左袖口',
    // },
]
