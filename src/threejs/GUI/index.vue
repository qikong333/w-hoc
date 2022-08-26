<template>
    <a-row>
        <!-- <a-col :span="8"> </a-col> -->
        <a-col :span="18">
            <div class="canvas" ref="canvasRef"></div>
        </a-col>
        <a-col :span="6">
            <a-collapse>
                <a-collapse-panel key="1" header="场景">
                    <a-row>
                        <a-col :span="4">背景：</a-col>
                        <a-col :span="18">
                            <a-select ref="select" style="width: 120px" v-model:value="sceneCtl.selectValue"
                                @change="sceneCtl.selectChange">
                                <a-select-option value="color">
                                    颜色
                                </a-select-option>
                                <a-select-option value="image">
                                    贴图
                                </a-select-option>
                            </a-select>

                            <input v-if="sceneCtl.selectValue === 'color'" type="color"
                                @change="r => changeSceneBg(r.target?.value, 1)" />
                            <div v-if="sceneCtl.selectValue === 'image'" class="bgbox">
                                <img @click="changeSceneBg(item.url, 0)" :src="item.url" v-for="item in bgData"
                                    :key="item.url" />
                            </div>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="灯光"> 111 </a-collapse-panel>
                <a-collapse-panel key="3" header="模型"> 333 </a-collapse-panel>
                <a-collapse-panel key="4" header="材质">
                    <div @click="textureCtl.select(item.url)" v-for="item in textureCtl.list" :key="item.url">
                        {{ item.name }}
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="5" header="截图">
                    <a-button @click="rendererCtl.screenshot">
                        截图
                    </a-button>
                    <div class="bgbox">
                        <img :src='url' v-for='url in rendererCtl.imgURL' :key="url" />

                    </div>
                </a-collapse-panel>
            </a-collapse>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import select from 'ant-design-vue/lib/select'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted, reactive, ref } from 'vue'
import { bgData } from './data'
import useCamera from './hooks/useCamera'
import useLight from './hooks/useLight'
import useLoadModels from './hooks/useLoadModels'
import useMaterial from './hooks/useMaterial'
import useRenderer from './hooks/useRenderer'
import useScene from './hooks/useScene'
import useTexture from './hooks/useTexture'

const gltfLoader = new GLTFLoader()
const canvasRef = ref()
const rendererCtl = reactive({
    imgURL: [],
    screenshot() {
        rendererCtl.imgURL.push(cut(scene, camera))
    }
})
const sceneCtl = reactive({
    selectValue: 'color',
})

const textureCtl = reactive({
    list: [
        { name: '纹理1', url: 'src/threejs/img/map.jpeg' }
    ],
    select(url) {
        const m = loadTexture(url)
        console.log(m);

        setMaterial('111', m)
    }
})

const { renderer, cut } = useRenderer()
const { scene, changeSceneBg } = useScene()
const { camera, controls } = useCamera(renderer)
const { material, setMaterial } = useMaterial(scene)
const { light, ambientLight } = useLight()
const { texture, loadTexture } = useTexture()
scene.add(light)
useLoadModels(scene)

onMounted(() => {

    canvasRef.value.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
        // composer.render()
    }

    animate()
})
</script>

<style lang="scss" scoped>
.bgbox {
    height: 50vh;
    overflow: auto;

}
</style>
