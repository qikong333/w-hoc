import { defineComponent, reactive, ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { Button, Radio } from 'ant-design-vue'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Color from './color'
import getMaterials from './material'
import YwRadio from '@/components/forms/YwRadio'

const scene = new THREE.Scene()

export default defineComponent({
    setup(props) {
        const fbxLoader = new GLTFLoader()

        const canvasRef = ref()
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            precision: 'highp',
        })
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.25
        const colorVal = ref()

        scene.background = new THREE.Color(0xffffff)

        const camera = new THREE.PerspectiveCamera(25, 500 / 500, 0.1, 1000)
        const material = ref(new THREE.MeshLambertMaterial({ color: 0x00ffff }))
        material.value.needsUpdate = true

        // LIGHTS
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
        // const light = new THREE.DirectionalLight(0xffffff, 1.0)
        // const sphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
        const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
        scene.add(light)
        // scene.add(ambientLight)
        //

        // const pointLinght = new THREE.PointLight(0xffffff, 0.5)
        // pointLinght.position.x = 2
        // pointLinght.position.y = 3
        // pointLinght.position.z = 4
        // scene.add(pointLinght)

        // light.position.set(0.32, 0.89, 4.7)
        // sphereLight.position.set(-0.32, 0.89, 4.7)

        // scene.add(ambientLight, sphereLight)
        // scene.add(light)

        function changeColor(r: any) {
            console.log(r.target.value)
            material.value.color = new THREE.Color(r.target.value)

            console.log(scene.getObjectByName('222'))
            const mu = scene.getObjectByName('222')
            mu.children[0].material.color = new THREE.Color(r.target.value)
        }

        fbxLoader.load(
            'src/threejs/models/a.gltf',
            object => {
                console.log(object)

                // object.traverse(function (child) {
                //     if ((child as THREE.Mesh).isMesh) {
                //         // (child as THREE.Mesh).material = material
                //         if ((child as THREE.Mesh).material) {
                //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
                //         }
                //     }
                // })
                // object.scale.set(0.01, 0.01, 0.01)
                // object.position.set(0, 0, 0)

                // scene.add(object)
                object.scene.name = '222'
                scene.add(object.scene)
            },
            xhr => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            error => {
                console.log(error)
            }
        )
        onMounted(() => {
            renderer.setSize(500, 500)
            canvasRef.value.appendChild(renderer.domElement)

            const geometry = new THREE.BoxGeometry(1, 1, 1)

            material.value.side = THREE.DoubleSide // 查看反面
            const cube = new THREE.Mesh(geometry, material.value)
            // scene.add(cube)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enablePan = false
            // controls.maxZoom  = 1   // 缩小
            // controls.minZoom  = 1  // 放大
            // controls.update()

            camera.position.z = 2

            // 後期處理
            // const composer = new EffectComposer(renderer)
            // const renderPass = new RenderPass(scene, camera)
            // composer.addPass(renderPass)

            // const glitchPass = new GlitchPass()
            // composer.addPass(glitchPass)

            function animate() {
                requestAnimationFrame(animate)
                controls.update()
                renderer.render(scene, camera)
                // composer.render()
            }

            animate()
        })

        const url = ref('')
        function cut() {
            var image = new Image()
            renderer.render(scene, camera) //此处renderer为three.js里的渲染器，scene为场景 camera为相机

            let imgData = renderer.domElement.toDataURL('image/jpeg') //这里可以选择png格式jpeg格式
            url.value = imgData
            // document.body.appendChild(image) //这样就可以查看截出来的图片了
        }

        function getColor(url: string) {
            console.log(url)
            const texture = new THREE.TextureLoader().load(url)
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(6, 6)
            // texture.anisotropy = 10
            const material1 = getMaterials(
                // radioVal.value,
                2,
                texture,
                colorVal.value
            )

            const mu = scene.getObjectByName('222')
            mu.children[0].material = material1
        }

        const radioVal = ref(1)
        const radio = [
            { label: 'MeshLambertMaterial', value: 1 },
            { label: 'MeshMatcapMaterial', value: 2 },
        ]

        return () => (
            <>
                {radioVal.value}
                <YwRadio
                    v-model:value={radioVal.value}
                    item={{
                        label: '材质',
                        options: radio,
                    }}
                ></YwRadio>

                <Color onChange={getColor} />
                <Button onClick={cut}>截圖</Button>
                {colorVal.value}
                <input
                    v-model={colorVal.value}
                    type="color"
                    id="head"
                    name="head"
                    onChange={changeColor}
                />
                <div class="flex">
                    <div class="basis-1/2">
                        <div
                            ref={canvasRef}
                            style={{
                                width: '500px',
                                height: '500px',
                            }}
                        ></div>
                    </div>
                    <div class="basis-1/2">3d模型渲染窗口</div>

                    <div class="basis-1/2">
                        <img src={url.value} />
                    </div>
                    <div class="basis-1/2">圖片截圖</div>
                </div>
            </>
        )
    },
})
