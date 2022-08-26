import * as THREE from 'three'

export default function () {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
    return {
        light,
        ambientLight,
    }
}
