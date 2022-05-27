const trafficline = (AMap, map) => {
    var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10,
        zooms: [7, 22],
    })
    // trafficLayer.setMap(map)
    map.add(trafficLayer)
}

export default trafficline
