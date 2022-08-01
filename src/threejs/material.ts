import * as THREE from 'three'
import { Texture } from 'three'

const getMaterials = (type: number, texture: Texture) => {
    let m = ''
    switch (type) {
        case 1:
            m = new THREE.MeshStandardMaterial({
                alphaMap: texture,
                color: new THREE.Color('#000'),
                normalMap: texture,
                // normalScale: new THREE.Vector2(13, 13),
                normalMapType: THREE.ObjectSpaceNormalMap,
                roughnessMap: texture,
                emissive: new THREE.Color('#fff'),
                emissiveMap: texture,
                emissiveIntensity: 0.8,
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
