import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function (scene: THREE.Scene) {
    const loader = new GLTFLoader()

    loader.load(
        'src/threejs/models/12.glb',
        object => {
            console.log(object.scene)

            scene.add(object.scene)
            scene.name = '111'
        },
        xhr => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        error => {
            console.log(error)
        }
    )
}
