/**
 *
 * @param AMap
 * @param map
 * @param zoom
 * 设置、获取缩放级别
 */

export const setZoom = (AMap, map, zoom) => {
    map.setZoom(zoom)
}

export const getZoom = (AMap, map) => {
    return map.getZoom()
}
