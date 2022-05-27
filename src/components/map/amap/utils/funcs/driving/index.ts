// import pathNavigator from './pathNavigator'
import { MapParms } from '../../../types/mapParams'
import { DrivingInput } from './types/input'

/**
 *
 * @param AMap 实例
 * @param map 地图
 */
function driving(expose: any, P?: DrivingInput) {
    if (!P) {
        return
    }
    const {
        /** 起点坐标 */
        startLngLat,
        /** 终点坐标 */
        endLngLat,
        /** 途经点 */
        waypoints,
    } = P
    const init = ({ AMap, map }: MapParms) => {
        AMap.plugin('AMap.Driving', () => {
            const driving = new AMap.Driving({
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map: map,
                ferry: 1,
            })
            // 根据起终点经纬度规划驾车导航路线
            driving.search(
                new AMap.LngLat(startLngLat[0], startLngLat[1]),
                new AMap.LngLat(endLngLat[0], endLngLat[1]),
                {
                    waypoints: handleWaypoints(AMap, waypoints),
                },
                function (status: any, result: any) {
                    // path = parseRoute(result.routes[0])
                    // pathNavigatorCon = pathNavigator(
                    //     AMapUI,
                    //     map,
                    //     [
                    //         {
                    //             path,
                    //         },
                    //     ],
                    //     {
                    //         pathColor: 'red',
                    //         markerImg:
                    //             'https://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
                    //     }
                    // )
                }
            )
        })
    }

    // function parseRoute(route: any) {
    //     const pathTemp = []
    //     for (let i = 0; i < route.steps.length; i++) {
    //         const step = route.steps[i]
    //         for (let j = 0, n = step.path.length; j < n; j++) {
    //             pathTemp.push(step.path[j])
    //         }
    //     }
    //     return pathTemp
    // }

    function handleWaypoints(AMap: any, arr?: number[][]) {
        const temp: any = []
        arr &&
            arr.map(val => {
                temp.push(new AMap.LngLat(val[0], val[1]))
            })
        return temp
    }

    return {
        init,
    }
}

export default driving
