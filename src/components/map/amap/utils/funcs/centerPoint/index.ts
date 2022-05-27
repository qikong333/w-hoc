/**
 *
 * @param AMap
 * @param map
 * @param position
 * 设置、获取中心点
 */

const setCenter = (AMap, map, position) => {
    map.setCenter(position)
}

const getCenter = (AMap, map) => {
    return map.getCenter()
}

const centerPoint = ({ AMap, map }, ...p: {}) => {
    p.ddd
}

export default centerPoint
