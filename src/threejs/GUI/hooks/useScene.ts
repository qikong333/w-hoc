import * as THREE from 'three'

export default function () {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x666666)

    const changeSceneBg = (color: string, n: number) => {
        if (n === 1) {
            scene.background = new THREE.Color(color)
        } else {
            // scene.background?.dispose()
            const texture = new THREE.TextureLoader().load(color)
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.encoding = THREE.sRGBEncoding
            scene.background = texture
        }
    }
    return { scene, changeSceneBg }
}
