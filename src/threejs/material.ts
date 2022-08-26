import * as THREE from 'three'
import { Texture } from 'three'

const getMaterials = (type: number, texture?: Texture, color?: string) => {
    let m = ''
    const textureLoad = new THREE.TextureLoader()

    switch (type) {
        case 1:
            const Mei = {
                Normal: textureLoad.load(
                    'src/threejs/img/Substance_Graph_Normal.jpg'
                ),
                roughnessMap: textureLoad.load(
                    'src/threejs/img/Substance_Graph_Roughness.jpg'
                ),
                height: textureLoad.load(
                    'src/threejs/img/Substance_Graph_Height.png'
                ),
                Base: textureLoad.load(
                    'src/threejs/img/Substance_Graph_BaseColor.jpg'
                ),
                aoMap: textureLoad.load(
                    'src/threejs/img/Substance_Graph_AmbientOcclusion.jpg'
                ),
            }
            const arr = [Mei.Normal, Mei.roughnessMap, Mei.height, Mei.Base]

            arr.map(r => {
                r.wrapS = THREE.RepeatWrapping
                r.wrapT = THREE.RepeatWrapping
                r.repeat.set(15, 15)
                // r.magFilter = 1000
            })
            m = new THREE.MeshStandardMaterial({
                // aoMap: aoMap,
                aoMapIntensity: 0.8,
                alphaToCoverage: true,
                alphaMap: Mei.height,
                // map: texture,
                displacementMap: Mei.roughnessMap,
                displacementScale: 0,
                // blendDstAlpha: THREE.ObjectSpaceNormalMap,
                // color: new THREE.Color(color),
                normalMap: Mei.Normal,
                clipIntersection: true,
                // colorWrite: false,
                // normalScale: new THREE.Vector2(0.1, 0.1),
                // normalMapType: THREE.ObjectSpaceNormalMap,
                roughnessMap: Mei.roughnessMap,
                bumpMap: Mei.roughnessMap,
                // lightMap: LightMap,
                polygonOffset: true,
                polygonOffsetUnits: 10,
                polygonOffsetFactor: 10,
                // emissive: new THREE.Color('#fff'),
                // emissiveMap: roughnessMap,
                // emissiveIntensity: 1,
                precision: 'highp',
                premultipliedAlpha: true,
                dithering: true,
            })
            break
        case 2:
            const apMap1 = textureLoad.load('src/threejs/img/1.jpg')
            const apMap2 = textureLoad.load('src/threejs/img/2.jpg')
            const norMap3 = textureLoad.load('src/threejs/img/3.jpg')
            const norMap4 = textureLoad.load('src/threejs/img/4.jpg')

            const arr1 = [apMap1, apMap2, norMap3, norMap4]

            arr1.map(r => {
                r.wrapS = THREE.RepeatWrapping
                r.wrapT = THREE.RepeatWrapping
                r.repeat.set(12, 12)
                // r.magFilter = 1000
            })
            m = new THREE.MeshStandardMaterial({
                aoMap: apMap2,
                aoMapIntensity: 0.8,
                alphaToCoverage: true,
                // alphaMap: Mei.height,
                // map: apMap1,
                displacementMap: apMap1,
                displacementScale: 0,
                // displacementBias: 1,
                // blendDstAlpha: THREE.ObjectSpaceNormalMap,
                // color: new THREE.Color(color),
                normalMap: norMap3,
                clipIntersection: true,
                // colorWrite: false,
                // normalScale: new THREE.Vector2(0.1, 0.1),
                // normalMapType: THREE.ObjectSpaceNormalMap,
                roughnessMap: apMap1,
                bumpMap: apMap2,
                // lightMap: LightMap,
                polygonOffset: true,
                polygonOffsetUnits: 10,
                polygonOffsetFactor: 10,
                // emissive: new THREE.Color('#fff'),
                // emissiveMap: roughnessMap,
                // emissiveIntensity: 1,
                precision: 'highp',
                premultipliedAlpha: true,
                dithering: true,
            })

            break

        case 3:
            // m =new  THREE.
            break
        default:
            break
    }
    return m
}

export default getMaterials
