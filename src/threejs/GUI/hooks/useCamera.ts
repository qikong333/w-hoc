import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function (renderer: THREE.Renderer) {
    const camera = new THREE.PerspectiveCamera(25, 500 / 500, 0.1, 1000)
    camera.position.z = 2

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    return { camera, controls }
}
