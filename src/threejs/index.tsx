import { defineComponent, reactive, ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default defineComponent({
    setup(props) {
        const canvasRef = ref()

        onMounted(() => {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000)

            const renderer = new THREE.WebGLRenderer()
            renderer.setSize(500, 500)
            canvasRef.value.appendChild(renderer.domElement)

            const geometry = new THREE.BoxGeometry(1, 1, 1)
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            const cube = new THREE.Mesh(geometry, material)
            scene.add(cube)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enablePan = false
            // controls.maxZoom  = 1   // 缩小
            // controls.minZoom  = 1  // 放大
            controls.update()

            camera.position.z = 2

            function animate() {
                requestAnimationFrame(animate)
                controls.update()
                renderer.render(scene, camera)
            }

            animate()
        })

        return () => (
            <>
                <div
                    ref={canvasRef}
                    style={{
                        width: '500px',
                        height: '500px',
                    }}
                ></div>
            </>
        )
    },
})
