import * as THREE from 'three'
import { Vector2 } from 'three'

export default function () {
    let texture: THREE.Texture = null

    function loadTexture(url: string) {
        texture = new THREE.TextureLoader().load(url)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        // texture.repeat.set(40, 40)
        const m = new THREE.MeshLambertMaterial({
            map: texture, //设置
        })

        // const m = new THREE.MeshStandardMaterial({
        //     // aoMap: texture,
        //     aoMapIntensity: 0.8,
        //     alphaToCoverage: true,
        //     // alphaMap: Mei.height,
        //     map: texture,
        //     // displacementMap: texture,
        //     displacementScale: 0,
        //     // displacementBias: 1,
        //     // blendDstAlpha: THREE.ObjectSpaceNormalMap,
        //     // color: new THREE.Color(color),
        //     // normalMap: texture,
        //     clipIntersection: true,
        //     // colorWrite: false,
        //     // normalScale: new THREE.Vector2(0.1, 0.1),
        //     // normalMapType: THREE.ObjectSpaceNormalMap,
        //     // roughnessMap: texture,
        //     // bumpMap: texture,
        //     // lightMap: LightMap,
        //     polygonOffset: true,
        //     polygonOffsetUnits: 10,
        //     polygonOffsetFactor: 10,
        //     // emissive: new THREE.Color('#fff'),
        //     // emissiveMap: roughnessMap,
        //     // emissiveIntensity: 1,
        //     precision: 'highp',
        //     premultipliedAlpha: true,
        //     dithering: true,
        // })
        return texture
    }

    return { texture, loadTexture }
}
