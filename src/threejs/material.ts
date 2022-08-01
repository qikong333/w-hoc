import * as THREE from 'three'
import { Texture } from 'three'

const getMaterials = (type: number, texture?: Texture, color?: string) => {
    let m = ''
    const textureLoad = new THREE.TextureLoader()
    const Normal = textureLoad.load(
        'src/threejs/img/Substance_Graph_Normal.jpg'
    )
    const roughnessMap = textureLoad.load(
        'src/threejs/img/Substance_Graph_Roughness.jpg'
    )

    const height = textureLoad.load(
        'src/threejs/img/Substance_Graph_Height.png'
    )

    const Base = textureLoad.load(
        'src/threejs/img/Substance_Graph_BaseColor.jpg'
    )

    const aoMap = textureLoad.load(
        'src/threejs/img/Substance_Graph_AmbientOcclusion.jpg'
    )

    const arr = [Normal, roughnessMap, height, Base]

    arr.map(r => {
        r.wrapS = THREE.RepeatWrapping
        r.wrapT = THREE.RepeatWrapping
        r.repeat.set(5, 5)
        // r.magFilter = 1000
    })

    switch (type) {
        case 1:
            m = new THREE.MeshStandardMaterial({
                aoMap: aoMap,
                aoMapIntensity: 0.8,
                alphaToCoverage: true,
                alphaMap: height,
                map: Base,
                // blendDstAlpha: THREE.ObjectSpaceNormalMap,
                // color: new THREE.Color(color),
                normalMap: Normal,
                clipIntersection: true,
                // colorWrite: false,
                // normalScale: new THREE.Vector2(0.1, 0.1),
                // normalMapType: THREE.ObjectSpaceNormalMap,
                roughnessMap: roughnessMap,
                // bumpMap: height,
                // lightMap: LightMap,
                polygonOffset: true,
                polygonOffsetUnits: 10,
                polygonOffsetFactor: 10,
                // emissive: new THREE.Color('#fff'),
                // emissiveMap: texture,
                // emissiveIntensity: 1,
                precision: 'highp',
                premultipliedAlpha: true,
                dithering: true,
            })
            break
        case 2:
            m = new THREE.MeshLambertMaterial({
                aoMap: texture,
                emissive: new THREE.Color('#fff'),
                emissiveMap: texture,
                emissiveIntensity: 0.8,
            })

            break
        default:
            break
    }
    return m
}

export default getMaterials
