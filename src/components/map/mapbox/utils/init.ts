import mapbox from 'mapbox-gl'

const newMap = () => {
    mapbox.accessToken =
        'pk.eyJ1Ijoicm9uZ3dlbiIsImEiOiJja3QyOHUwbGowNDFxMnFyNXc5aW1vemJuIn0._jweIuyOwoO_yuA_xe2zuw'
    const map = new mapbox.Map({
        container: 'mapBoxC',
        style: {
            version: 8,
            sources: {
                'raster-tiles': {
                    type: 'raster',
                    tiles: [
                        'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                    ],
                    tileSize: 256,
                },
            },
            layers: [
                {
                    id: 'simple-tiles',
                    type: 'raster',
                    source: 'raster-tiles',
                    minzoom: 0,
                    maxzoom: 22,
                },
            ],
        },
        center: [120.57229, 31.28505],
        zoom: 9,
    })

    return map
}

export default newMap
