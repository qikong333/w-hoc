import { MapParms } from '@/components/map/amap/types/mapParams'

export interface PathNavigatorInput {
    /**单条路线数据 */
    list: any[][]
    config?: {
        /** 路径颜色 */
        pathColor?: string
        /** 移动后路径颜色 */
        moveColor?: string
        /** 移动后箭头颜色 */
        arrowColor?: string
        /** 标记点图片 */
        markerImg?: string
    }
}
