import { DrivingOutput } from '../utils/funcs/driving/types/output'
import { PathNavigatorOutput } from '../utils/funcs/pathNavigator/types/output'

export interface MapOutput {
    // 轨迹巡航
    pathNavigator?: PathNavigatorOutput
    // 路线规划
    driving?: DrivingOutput
}
