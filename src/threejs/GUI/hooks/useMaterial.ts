import * as THREE from 'three'

export default function (scene: THREE.Scene) {
    const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
    material.needsUpdate = true
    material.side = THREE.DoubleSide

    function setMaterial(name: string, material1: THREE.Material) {
        const mu = scene.getObjectByName(name)

        mu.traverse(function (obj) {
            if (obj.type === 'Mesh') {
                //几何体UV坐标定义

                obj.material = material1
            }
        })
    }

    function setMaterialColor(name: string, color: string) {
        const mu = scene.getObjectByName(name)
        mu.traverse(function (obj) {
            if (obj.type === 'Mesh') {
                //几何体UV坐标定义

                obj.material.color = new THREE.Color(color)
            }
        })
    }
    return {
        material,
        setMaterial,
        setMaterialColor,
    }
}
