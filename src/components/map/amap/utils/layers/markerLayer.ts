const marker = (AMap, map, icon, position) => {
    const marker = new AMap.Marker({
        icon,
        position,
    })
    map.add(marker)
}

export default marker
