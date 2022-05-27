import { DrivingInput } from '../utils/funcs/driving/types/input'
import { PathNavigatorInput } from '../utils/funcs/pathNavigator/types/input'

export interface MpaInput {
    // 中心点
    centerPoint?: []

    // 线路规划
    routePlanning?: RoutePlanning
    // 轨迹导航

    /** 地图样式 */
    mapStyle: {}
    /** 驾车路线规划 */
    driving?: DrivingInput
    /** 轨迹巡航 */
    pathNavigator?: PathNavigatorInput
}

// 线路规划
export interface RoutePlanning {
    start: []
    end: []
}
