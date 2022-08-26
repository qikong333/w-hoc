import * as THREE from 'three'

export default function () {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'highp',
    })

    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.LinearToneMapping
    renderer.toneMappingExposure = 1.25
    renderer.setSize(1000, 800)
    function cut(scene: THREE.Scene, camera: THREE.Camera): string {
        var image = new Image()
        renderer.render(scene, camera) //此处renderer为three.js里的渲染器，scene为场景 camera为相机

        let imgData = renderer.domElement.toDataURL('image/jpeg') //这里可以选择png格式jpeg格式
        return imgData
        // document.body.appendChild(image) //这样就可以查看截出来的图片了
    }
    return { renderer, cut }
}
