import * as THREE from 'three'

export default function (scene: THREE.Scene) {
    const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
    material.needsUpdate = true
    material.side = THREE.DoubleSide

    function setMaterial(name: string, material1) {
        console.log(material1)

        const mu = scene.getObjectByName(name)

        mu.traverse(function (obj) {
            if (obj.type === 'Mesh') {
                console.log(obj)
                //几何体UV坐标定义

                obj.material.map = material1
            }
        })
    }
    return {
        material,
        setMaterial,
    }
}
