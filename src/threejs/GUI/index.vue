<template>
    <a-row>
        <!-- <a-col :span="8"> </a-col> -->
        <a-col :span="18">
            <div class="canvas" ref="canvasRef"></div>
        </a-col>
        <a-col :span="6">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="场景">
                    <a-row>
                        <a-col :span="4">背景：</a-col>
                        <a-col :span="18">
                            <a-select
                                ref="select"
                                style="width: 120px"
                                v-model:value="sceneCtl.selectValue"
                            >
                                <a-select-option value="color">
                                    颜色
                                </a-select-option>
                                <a-select-option value="image">
                                    贴图
                                </a-select-option>
                            </a-select>

                            <input
                                v-if="sceneCtl.selectValue === 'color'"
                                type="color"
                                @change="r => changeSceneBg(r.target?.value, 1)"
                            />
                            <div
                                v-if="sceneCtl.selectValue === 'image'"
                                class="bgbox"
                            >
                                <img
                                    @click="changeSceneBg(item.url, 0)"
                                    :src="item.url"
                                    v-for="item in bgData"
                                    :key="item.url"
                                />
                            </div>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="灯光">
                    开发中...
                </a-collapse-panel>
                <a-collapse-panel key="3" header="模型">
                    <div
                        style="background: #000"
                        v-for="item in modelData"
                        :key="item.name"
                        @click="selectModel(item.name)"
                    >
                        <img
                            :src="item.model.img"
                            alt=""
                            class=""
                            width="100"
                            height="100"
                        />
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="4" header="材质">
                    <div
                        @click="textureCtl.select(item.url)"
                        v-for="item in materialDatas"
                        :key="item.url"
                    >
                        <img
                            :src="item.name"
                            alt=""
                            class=""
                            width="100"
                            height="100"
                        />
                    </div>

                    <a-row>
                        <a-col :span="4"> 颜色: </a-col>
                        <a-col :span="20">
                            <input
                                type="color"
                                @change="
                                    r => textureCtl.changeColor(r.target?.value)
                                "
                        /></a-col>

                        <a-col :span="24"> offset: </a-col>
                        <a-col :span="4"> x: </a-col>
                        <a-col :span="20">
                            <a-slider
                                v-model:value="textureCtl.offset.x"
                                :min="0"
                                :max="5"
                                :step="0.01"
                                @change="r => textureCtl.changeV(r, 'x')"
                            />
                        </a-col>
                        <a-col :span="4"> y: </a-col>
                        <a-col :span="20">
                            <a-slider
                                v-model:value="textureCtl.offset.y"
                                :min="0"
                                :max="5"
                                :step="0.01"
                                @change="r => textureCtl.changeV(r, 'y')"
                            />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24"> rotation: </a-col>
                        <a-col :span="24">
                            <a-slider
                                v-model:value="textureCtl.rotation.v"
                                :min="0"
                                :max="360"
                                :step="0.1"
                                @change="r => textureCtl.changeV(r, 'rotation')"
                            />
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="5" header="截图">
                    <a-button @click="rendererCtl.screenshot"> 截图 </a-button>
                    <div class="bgbox">
                        <img
                            :src="url"
                            v-for="url in rendererCtl.imgURL"
                            :key="url"
                        />
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="6" header=" Image Upload ">
                    <div>
                        <a-button @click="loadUploadModel">获取模型 </a-button>
                    </div>
                    <br />
                    <a-row>
                        <a-col :span="24">贴图：</a-col>
                        <a-col :span="6" v-for="item in uploadData" :key="item">
                            <a-button @click="getMaterial(item)">
                                {{ item?.value }}
                            </a-button>
                        </a-col>
                    </a-row>
                    <br />
                    <div>
                        logo贴图：
                        <a-button @click="logoTexture"> logo </a-button>
                        <a-row>
                            <!-- <a-col :span="24"> offset-x: </a-col>
                            <a-col :span="24">
                                <a-slider
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    @change="r => changeOffset(r, 'x')"
                                />
                            </a-col>
                            <a-col :span="24"> offset-y: </a-col>
                            <a-col :span="24">
                                <a-slider
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    @change="r => changeOffset(r, 'y')"
                                />
                            </a-col> -->
                            <a-col :span="24"> repeat: </a-col>
                            <a-col :span="24">
                                <a-slider
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    @change="r => changeRep(r)"
                                />
                            </a-col>
                        </a-row>
                    </div>
                    <br />
                    <div>
                        背景色：
                        <input
                            type="color"
                            @change="r => changeBG(r.target?.value)"
                        />
                    </div>
                </a-collapse-panel>
            </a-collapse>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import router from '@/router'
import select from 'ant-design-vue/lib/select'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { computed, onMounted, reactive, ref } from 'vue'
import Global from './cosnt'
import { bgData, modelData, uploadData } from './data'
import useCamera from './hooks/useCamera'
import useLight from './hooks/useLight'
import useModels from './hooks/useModels'
import useMaterial from './hooks/useMaterial'
import useRenderer from './hooks/useRenderer'
import useScene from './hooks/useScene'
import useTexture from './hooks/useTexture'
import { mainStore } from '@/store'
import { Upload } from 'ant-design-vue'
import useImageLoad from './hooks/useImageLoad'
const store = mainStore()
const bgList = ref([])
const activeKey = ref([])
const materialDatas = computed(() => {
    const arr = modelData.filter(r => r.name === store.threejs.name)
    return arr[0].maps
})

const gltfLoader = new GLTFLoader()
const canvasRef = ref()
const rendererCtl = reactive({
    imgURL: [],
    screenshot() {
        rendererCtl.imgURL.push(cut(scene, camera))
    },
})
const sceneCtl = reactive({
    selectValue: 'color',
})

const textureCtl = reactive({
    changeColor(c) {
        setMaterialColor(String(store.threejs.name), c)
    },
    changeV(e, t) {
        setAngle(e, t)
    },
    offset: {
        x: 0,
        y: 0,
    },
    rotation: {
        v: 0,
    },
    value1: 0,
    value2: 0,
    // list: computed(() => {
    //     const arr = []
    //     materialDatas.map(async r => {
    //         const path = await r.name
    //         r.name = path?.default
    //         arr.push(r)
    //     })
    //     return arr
    // }),
    select(url) {
        const m = loadTexture(url)
        setMaterial(String(store.threejs.name), m)
    },
})

const { renderer, cut } = useRenderer()
const { scene, changeSceneBg } = useScene()
const { camera, controls } = useCamera(renderer)
const { material, setMaterial, setMaterialColor } = useMaterial(scene)
const { light, ambientLight } = useLight()
const { texture, loadTexture, setAngle } = useTexture({ scene })
const { loadModel, deleteModel } = useModels(scene)
const {
    loadUploadModel,
    getMaterial,
    setRepeat,
    changeBG,
    logoTexture,
    changeOffset,
    changeRep,
} = useImageLoad(scene)
scene.add(light)

loadModel()
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

function selectModel(name: number) {
    deleteModel()
    store.threejs.name = name
    loadModel()
}
</script>

<style lang="scss" scoped>
.bgbox {
    height: 50vh;
    overflow: auto;
}
</style>
