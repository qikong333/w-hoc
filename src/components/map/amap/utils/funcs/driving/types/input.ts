export interface DrivingInput {
    /** 起点坐标 */
    startLngLat: number[]
    /** 终点坐标 */
    endLngLat: number[]
    /** 途经点坐标 */
    waypoints?: number[][]
}
