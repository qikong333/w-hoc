import * as THREE from 'three'
import { Scene } from 'three'

export default function (scene: Scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
    const lightHelper = new THREE.HemisphereLightHelper(light, 2)

    function setSkyColor(color: string) {
        scene.traverse(obj => {
            if (obj.type === 'HemisphereLight') {
                obj.color = new THREE.Color(color)
            }
        })
    }
    function setGroundColor(color: string) {
        scene.traverse(obj => {
            if (obj.type === 'HemisphereLight') {
                obj.groundColor = new THREE.Color(color)
            }
        })
    }
    function setPostiont(n: number, t: string) {
        scene.traverse(obj => {
            if (obj.type === 'HemisphereLight') {
                obj.position[t] = n
            }
        })
    }

    return {
        lightHelper,
        light,
        ambientLight,
        setPostiont,
        setSkyColor,
        setGroundColor,
    }
}
