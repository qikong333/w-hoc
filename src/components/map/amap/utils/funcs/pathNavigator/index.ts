import $ from 'jquery'
import { watch } from 'vue'
import { MapParms } from '../../../types/mapParams'
import { PathNavigatorInput } from './types/input'
import { setZoom, getZoom } from '../../funcs/zoom'
import video1mp4 from '../../../../../../assets/video1.mp4'
import video2ogg from '../../../../../../assets/video2.ogg'
import video3mp4 from '../../../../../../assets/video3.mp4'

/**
 *
 * @param AMapUI 实例
 * @param map 地图
 * @param arr 单条路线数据
 * @param config 配置
 *
 */
function pathNavigator(expose: any, P?: PathNavigatorInput) {
    if (!P) {
        return
    }
    const { config, list } = P
    let getN: any
    let navg: any
    let pathSimplifierIns: any
    let polygon1: any
    let polygon2: any
    let countdown1: any
    let countdown2: any
    let video1: any
    let video2: any
    let video3: any

    const init = ({ AMapUI, map }: MapParms) => {
        AMapUI.setDomLibrary($)
        AMapUI.load(
            ['ui/misc/PathSimplifier', 'lib/$'],
            (PathSimplifier: any, $: any) => {
                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！')
                    return
                }

                pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    map: map, //所属的地图实例

                    getPath: function (pathData: any) {
                        return pathData.path
                    },
                    renderOptions: {
                        pathLineStyle: {
                            dirArrowStyle: true,
                        },
                        getPathStyle: function (pathItem: any, zoom: any) {
                            let lineWidth = Math.round(
                                4 * Math.pow(1.1, zoom - 3)
                            )

                            return {
                                pathLineStyle: {
                                    strokeStyle: config
                                        ? config.pathColor
                                            ? config.pathColor
                                            : 'green'
                                        : 'green',
                                    lineWidth: lineWidth,
                                },
                                pathLineSelectedStyle: {
                                    lineWidth: lineWidth + 2,
                                },
                                pathNavigatorStyle: {
                                    width: 20,
                                    height: 20,
                                    //使用图片
                                    content:
                                        PathSimplifier.Render.Canvas.getImageContent(
                                            config
                                                ? config.markerImg
                                                    ? config.markerImg
                                                    : ''
                                                : '',
                                            onload,
                                            onerror
                                        ),
                                    strokeStyle: null,
                                    fillStyle: null,
                                    //经过路径的样式
                                    pathLinePassedStyle: {
                                        lineWidth: 6,
                                        strokeStyle: config
                                            ? config.moveColor
                                                ? config.moveColor
                                                : '#CCC'
                                            : '#CCC',
                                        dirArrowStyle: {
                                            stepSpace: 15,
                                            strokeStyle: config
                                                ? config.arrowColor
                                                    ? config.arrowColor
                                                    : 'white'
                                                : 'white',
                                        },
                                    },
                                },
                            }
                        },
                    },
                })

                getN = function getNavg(pathIndex: any) {
                    let navgtr = pathSimplifierIns.createPathNavigator(
                        pathIndex,
                        {
                            loop: true,
                            speed: parseInt($('#speedInp_' + pathIndex).val()),
                        }
                    )
                    return navgtr
                }
                pathSimplifierIns.setData([{ path: list }])
                navg = getN(0)
                // 缩放
                setZoom(AMapUI, map, 18)
                // 禁止缩放拖动
                map.setStatus({
                    zoomEnable: false,
                    dragEnable: false,
                    keyboardEnable: false,
                })
            }
        )

        // 区域范围（矩形1）
        const path1 = [
            new AMap.LngLat(113.472641, 23.177938),
            new AMap.LngLat(113.472555, 23.177381),
            new AMap.LngLat(113.473161, 23.177376),
            new AMap.LngLat(113.473199, 23.177869),
        ]
        // 区域范围（矩形2）
        const path2 = [
            new AMap.LngLat(113.477681, 23.176999),
            new AMap.LngLat(113.477718, 23.176402),
            new AMap.LngLat(113.478255, 23.176422),
            new AMap.LngLat(113.478164, 23.177038),
        ]
        polygon1 = new AMap.Polygon({
            path: path1,
            strokeColor: 'red',
            // strokeWeight: 6,
            strokeOpacity: 0.5,
            zIndex: 50,
            // strokeDasharray: [30, 10],
            // strokeStyle: 'solid',
            fillColor: 'red',
            fillOpacity: 0.5,
            // cursor: 'pointer',
        })
        polygon2 = new AMap.Polygon({
            path: path2,
            strokeColor: 'red',
            // strokeWeight: 6,
            strokeOpacity: 0.5,
            zIndex: 50,
            // strokeDasharray: [30, 10],
            // strokeStyle: 'solid',
            fillColor: 'red',
            fillOpacity: 0.5,
            // cursor: 'pointer',
        })
        map.add(polygon1)
        map.add(polygon2)

        // 倒计时1
        let tmpDiv = document.createElement('div')
        tmpDiv.innerHTML =
            '<div style="color: #fff; width: 50px;height: 50px;background: red; text-align: center; line-height: 50px" id="count">50</div>'
        countdown1 = new AMap.Marker({
            content: tmpDiv,
            map,
            anchor: 'center',
            position: [113.472942, 23.177786],
        })
        // 倒计时2
        let tmpDiv2 = document.createElement('div')
        tmpDiv2.innerHTML =
            '<div style="color: #fff; width: 50px;height: 50px;background: red; text-align: center; line-height: 50px" id="count2">50</div>'
        countdown2 = new AMap.Marker({
            content: tmpDiv2,
            map,
            anchor: 'center',
            position: [113.477922, 23.176821],
        })

        // 视频1
        video1 = new AMap.Marker({
            content: `<div style="position: absolute; top: 64vh;left: 20vw;  width: 300px; height: 200px;background: #999;">
               <div style="text-align: center; line-height: 200px; font-size: 22px">暂无视频</div>
                </div>`,
            map,
        })

        // 视频2
        video2 = new AMap.Marker({
            content: `<div style="position: absolute; top: 64vh;left: 43vw; color: red; width: 300px; height: 200px;background: #999;">
                <video  id="videoBox2"  style="width: 100%; height:100%;" controls>
                  <source src="${video2ogg}" type="video/ogg">
                </video>
                </div>`,
            map,
        })

        // 视频3
        video3 = new AMap.Marker({
            content: `<div style="position: absolute; top: 64vh;left: 66vw; color: red; width: 300px; height: 200px;background: #999;">
                <video  id="videoBox3"  style="width: 100%; height:100%;" controls>
                  <source src="${video3mp4}" type="video/mp4">
                </video>
                </div>`,
            map,
        })
    }
    let timer1: any
    let timer2: any
    let leaveInterval1: any
    let leaveInterval2: any
    // 开始
    const start = (speed: number) => {
        // 轮询判断小车是否进入区域1内
        timer1 = setInterval(function () {
            if (polygon1.contains(getPosition())) {
                handleInArea()
            }
        }, 200)
        // 轮询判断小车是否进入区域2内
        timer2 = setInterval(function () {
            if (polygon2.contains(getPosition())) {
                handleInArea2()
            }
        }, 200)

        // pause

        // 巡航开始事件
        navg.start(Math.floor(Math.random() * 100), speed)
    }
    const handleInArea = () => {
        clearInterval(timer1)
        // 第二个视频开始播放
        let videoBox2: any = document.getElementById('videoBox2')
        videoBox2.play()
        // 第三个视频开始播放
        let videoBox3: any = document.getElementById('videoBox3')
        videoBox3.play()
        // 区域变底色
        polygon1.setOptions({
            fillColor: 'green',
        })
        // 倒计时开始
        let a: any = document.getElementById('count')
        a.style.background = 'green'
        let i = 49
        let fa = setInterval(function () {
            if (i < 1) {
                clearInterval(fa)
            } else {
                a.innerHTML = i
                i = i - 1
            }
        }, 1000)
        leaveInterval1 = setInterval(function () {
            if (!polygon1.contains(getPosition())) {
                leave(1)
            }
        }, 200)
    }
    const handleInArea2 = () => {
        clearInterval(timer2)
        // 区域变底色
        polygon2.setOptions({
            fillColor: 'green',
        })
        // 切换视频内容
        video1.setContent(`<div style="position: absolute; top: 64vh;left: 20vw; color: red; width: 300px; height: 200px;background: #999;">
        <video  id="videoBox1"  style="width: 100%; height:100%;" controls>
          <source src="${video2ogg}" type="video/ogg">
        </video>
        </div>`)
        video2.setContent(`<div style="position: absolute; top: 64vh;left: 43vw; color: red; width: 300px; height: 200px;background: #999;">
        <video  id="videoBox2"  style="width: 100%; height:100%;" controls>
          <source src="${video3mp4}" type="video/mp4">
        </video>
        </div>`)
        video3.setContent(`<div style="position: absolute; top: 64vh;left: 66vw; color: red; width: 300px; height: 200px;background: #999;">
        <video id="videoBox3" style="width: 100%; height:100%;" controls>
        <source src="${video1mp4}" type="video/mp4">
        </video>
         </div>`)
        // 视频开始播放
        let videoBox1: any = document.getElementById('videoBox1')
        videoBox1.play()
        let videoBox2: any = document.getElementById('videoBox2')
        videoBox2.play()
        let videoBox3: any = document.getElementById('videoBox3')
        videoBox3.play()
        // 倒计时开始
        let a: any = document.getElementById('count2')
        a.style.background = 'green'
        let i = 49
        let fa = setInterval(function () {
            if (i < 1) {
                clearInterval(fa)
            } else {
                a.innerHTML = i
                i = i - 1
            }
        }, 1000)
        leaveInterval2 = setInterval(function () {
            if (!polygon2.contains(getPosition())) {
                leave(2)
            }
        }, 200)
    }
    const leave = (val: any) => {
        const temp = val === 1 ? polygon1 : polygon2
        temp.setOptions({
            fillColor: 'red',
        })
        clearInterval(val === 1 ? leaveInterval1 : leaveInterval2)
        if (val === 2) {
            setTimeout(() => {
                pause()
            }, 4000)
        }
    }
    // 暂停
    const pause = () => {
        navg.pause()
    }
    // 获取当前巡航器的定位
    const getPosition = () => {
        return navg && navg.getPosition()
    }
    const resume = () => {
        navg.resume()
    }
    const stop = () => {
        navg.stop()
    }
    const destroy = () => {
        navg.destroy()
    }
    watch(
        () => {
            P?.list
        },
        () => {
            // init()
        },
        {
            deep: true,
        }
    )

    expose({
        pathNavigator: { start, pause, resume, stop, destroy, getPosition },
    })

    return {
        init,
    }
}

export default pathNavigator
