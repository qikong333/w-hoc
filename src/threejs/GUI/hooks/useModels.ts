import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Global from '../cosnt'
import { modelData } from '../data'
import { mainStore } from '@/store'
const store = mainStore()

export default function (scene: THREE.Scene) {
    const loader = new GLTFLoader()

    function loadModel() {
        loader.load(
            getItemModel().model.glb,
            object => {
                console.log(object.scene)
                object.scene
                object.scene.name = String(store.threejs.name)
                scene.add(object.scene)
            },
            xhr => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            error => {
                console.log(error)
            }
        )
    }

    function getItemModel() {
        const arr = modelData.filter(r => r.name === store.threejs.name)
        return arr[0]
    }

    function deleteModel() {
        const sce = scene.getObjectByName(String(store.threejs.name))
        sce.traverse(obj => {
            if (obj.type === 'Mesh') {
                obj.geometry.dispose()
                obj.material.dispose()
            }
        })
        scene.remove(sce)
    }

    return { loadModel, deleteModel }
}
