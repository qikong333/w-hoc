import * as THREE from 'three'
import { mainStore } from '@/store'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import getMaterials from '../../material'
const texture = new THREE.TextureLoader()
const store = mainStore()

const arrTextureIn = [
    'BODY-SR_BACK_1784',
    'BODY-SL_BACK_1775',
    'BODY-F_BACK_1744',
    'BODY-B_BACK_1753',
]
const arrTextureOut = [
    'BODY-SR_FRONT_1784',
    'BODY-SL_FRONT_1775',
    'BODY-F_FRONT_1744',
    'BODY-B_FRONT_1753',
]
const bgC = [
    'RIB-COLLAR_FRONT_1805',
    'RIB-B_FRONT_1769',
    'RIB-F_FRONT_1762',
    'RIB-SL_FRONT_1793',
    'RIB-SR_FRONT_1799',
]

const normalMap = texture.load('src/threejs/assets/imageUpload/normalMap.webp')
normalMap.flipY = false
normalMap.wrapS = THREE.RepeatWrapping
normalMap.wrapT = THREE.RepeatWrapping
normalMap.encoding = THREE.sRGBEncoding

const mtly = new THREE.MeshStandardMaterial({
    normalMap,
    color: new THREE.Color('#649812'),
})

export default function (scene: THREE.Scene) {
    const loader = new GLTFLoader()

    function loadUploadModel() {
        deleteModel()
        const loader = new GLTFLoader()
        const bg = texture.load('src/threejs/assets/imageUpload/bg.jpeg')
        bg.flipY = false
        bg.wrapS = THREE.RepeatWrapping
        bg.wrapT = THREE.RepeatWrapping
        bg.encoding = THREE.sRGBEncoding
        loader.load(
            'src/threejs/models/upload.glb',
            object => {
                object.scene.traverse(obj => {
                    if (obj.type === 'Mesh') {
                        console.log(obj.material.name)
                    }
                    if (
                        obj.type === 'Mesh' &&
                        arrTextureIn.includes(obj.material.name)
                    ) {
                        obj.material.map = bg
                        // obj.material = mtly
                    }

                    // obj.material.normalMap = normalMap
                })
                object.scene.name = '434'
                scene.add(object.scene)
            },
            xhr => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            error => {
                console.log(error)
            }
        )
    }

    function getMap() {
        const normalMap = texture.load(
            'src/threejs/assets/imageUpload/aoMap.webp'
        )
        normalMap.repeat.set(40, 40)
        const aoMap = texture.load('src/threejs/assets/imageUpload/aoMap.webp')
        const arr = [aoMap, normalMap]
        arr.map(r => {
            r.flipY = false
            r.wrapS = THREE.RepeatWrapping
            r.wrapT = THREE.RepeatWrapping
            r.encoding = THREE.sRGBEncoding
        })

        const m = new THREE.MeshStandardMaterial({
            aoMap: aoMap,
            aoMapIntensity: 0.8,
            alphaToCoverage: true,
            // alphaMap: Mei.height,
            // map: texture,
            // displacementMap: texture,
            // displacementScale: 0,
            // displacementBias: 1,
            // blendDstAlpha: THREE.ObjectSpaceNormalMap,
            color: new THREE.Color('#649812'),
            normalMap: normalMap,
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

        return { normalMap, aoMap, m }
    }

    function deleteModel() {
        if (!store.threejs.name) {
            return
        }
        const sce = scene.getObjectByName(String(store.threejs.name))
        sce.traverse(obj => {
            if (obj.type === 'Mesh') {
                obj.geometry.dispose()
                obj.material.dispose()
            }
        })
        scene.remove(sce)
    }
    function getMaps(url: string) {
        return mt
    }

    function getMaterial(item: any) {
        const map = texture.load(item.map)
        map.flipY = false
        map.wrapS = THREE.RepeatWrapping
        map.wrapT = THREE.RepeatWrapping
        map.encoding = THREE.sRGBEncoding
        // map.repeat.set(15, 15)

        const aoMap = texture.load('src/threejs/assets/imageUpload/aoMap.jpg')

        const bumpMap = texture.load(
            'src/threejs/assets/imageUpload/heightMap.png'
        )
        const roughnessMap = texture.load(
            'src/threejs/assets/imageUpload/roughnessMap.jpg'
        )
        const arr = [aoMap, bumpMap, roughnessMap]
        arr.map(r => {
            r.repeat.set(15, 15)
            r.flipY = false
            r.wrapS = THREE.RepeatWrapping
            r.wrapT = THREE.RepeatWrapping
            r.encoding = THREE.sRGBEncoding
            r.needsUpdate = true
        })

        const mt = new THREE.MeshStandardMaterial({
            // aoMap: aoMap,
            // aoMapIntensity: 0.8,
            // alphaToCoverage: true,
            // alphaMap: Mei.height,
            map,
            // color: new THREE.Color('#649812'),
            // aoMap,
            // roughnessMap,
            normalMap,
            // bumpMap,
            // emissiveMap,
            // displacementMap: texture,
            // displacementScale: 0,
            // displacementBias: 1,
            // blendDstAlpha: THREE.ObjectSpaceNormalMap,
            // color: new THREE.Color('#649812'),
            // normalMap: normalMap,
            // clipIntersection: true,
            // colorWrite: false,
            // normalScale: new THREE.Vector2(0.1, 0.1),
            // normalMapType: THREE.ObjectSpaceNormalMap,
            // roughnessMap: texture,
            // bumpMap: texture,
            // lightMap: LightMap,
            // polygonOffset: true,
            // polygonOffsetUnits: 10,
            // polygonOffsetFactor: 10,
            // emissive: new THREE.Color('#fff'),
            // emissiveMap: roughnessMap,
            // emissiveIntensity: 1,
            // precision: 'highp',
            // premultipliedAlpha: true,
            // dithering: true,
        })
        // mt.needsUpdate = true
        // mt.normalMap?.repeat.set(15, 15)

        const m = scene.getObjectByName('434')
        m.traverse(obj => {
            if (obj.type === 'Mesh') {
                if (obj.material?.name === item.name) {
                    obj.material = mt
                    // obj.material.color = new THREE.Color('#649812')
                    // obj.material.map.repeat.x = obj.material.map.repeat.y = 15
                }
            }
        })
    }

    function setRepeat(n: number) {
        console.log(n)

        const m = scene.getObjectByName('434')
        m.traverse(obj => {
            if (obj.type === 'Mesh') {
                console.log(obj)

                obj?.material?.normalMap?.repeat.set(n, n)
            }
        })
    }
    function setxy(n: number) {
        console.log(n)

        const m = scene.getObjectByName('434')
        m.traverse(obj => {
            if (obj.type === 'Mesh') {
                // obj.material.map.
            }
        })
    }

    function changeBG(color: string) {
        const m = scene.getObjectByName('434')
        m.traverse(obj => {
            if (obj.type === 'Mesh' && bgC.includes(obj.material.name)) {
                obj.material.color = new THREE.Color(color)
            }
        })
    }

    function logoTexture() {
        const logo = texture.load('src/threejs/assets/imageUpload/logo.png')
        logo.flipY = false
        logo.wrapS = 0
        logo.wrapT = 0

        logo.encoding = THREE.sRGBEncoding
        const m = scene.getObjectByName('434')
        const mt = new THREE.MeshPhongMaterial({
            map: logo,
            // normalMap,
            transparent: true,

            color: new THREE.Color('#ccc'),
        })
        mt.onBeforeCompile = function (shader) {
            var custom_map_fragment = THREE.ShaderChunk.map_fragment.replace(
                `diffuseColor *= texelColor;`,

                `diffuseColor = vec4( mix( diffuse, texelColor.rgb, texelColor.a ), opacity );`
            )

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                custom_map_fragment
            )
        }
        m.traverse(obj => {
            if (obj.type === 'Mesh') {
                if (obj.material?.name === 'BODY-F_FRONT_1744') {
                    obj.material = mt
                }
            }
        })
    }

    return {
        loadUploadModel,
        getMaterial,
        setRepeat,
        setxy,
        changeBG,
        logoTexture,
    }
}
