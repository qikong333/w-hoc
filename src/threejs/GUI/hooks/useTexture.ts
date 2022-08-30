import * as THREE from 'three'
import { Vector2 } from 'three'

export default function ({ scene }) {
    let texture: THREE.Texture = null

    function loadTexture(url: string) {
        texture = new THREE.TextureLoader().load(url)
        texture.flipY = false
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        // const m = new THREE.MeshLambertMaterial({
        //     aoMap: texture, //设置
        // })

        const m = new THREE.MeshStandardMaterial({
            // aoMap: texture,
            aoMapIntensity: 0.8,
            alphaToCoverage: true,
            // alphaMap: Mei.height,
            // map: texture,
            // displacementMap: texture,
            // displacementScale: 0,
            // displacementBias: 1,
            // blendDstAlpha: THREE.ObjectSpaceNormalMap,
            // color: new THREE.Color(color),
            normalMap: texture,
            clipIntersection: true,
            // colorWrite: false,
            // normalScale: new THREE.Vector2(0.1, 0.1),
            // normalMapType: THREE.ObjectSpaceNormalMap,
            // roughnessMap: texture,
            // bumpMap: texture,
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
        return m
    }

    function setAngle(num, type) {
        const mu = scene.getObjectByName('111')

        mu.traverse(function (obj) {
            if (obj.type === 'Mesh') {
                //几何体UV坐标定义
                switch (type) {
                    case 'x':
                        obj.material.map.offset = new THREE.Vector2(
                            num,
                            obj.material.map.offset.y
                        )
                        break

                    case 'y':
                        obj.material.map.offset = new THREE.Vector2(
                            obj.material.map.offset.x,
                            num
                        )
                        break

                    case 'rotation':
                        obj.material.map.rotation = num
                        break

                    default:
                        break
                }
            }
        })
    }
    return { texture, loadTexture, setAngle }
}
