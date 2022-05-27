import { defineComponent, onMounted, ref, reactive, computed, watch } from 'vue'
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader'
import trafficline from './utils/layers/trafficLayer'
import marker from './utils/layers/markerLayer'
import { setZoom, getZoom } from './utils/funcs/zoom'
import useHttp from '@/hook/useHttp'
import '@amap/amap-jsapi-types'
import pathNavigator from './utils/funcs/pathNavigator'
import { outputRes } from './types'
import { MpaInput } from './types/input'
import { MapParms } from './types/mapParams'
import driving from './utils/funcs/driving'

const RwAmap = defineComponent({
    props: ['mapStyle', 'pathNavigator', 'driving'],

    setup(props: MpaInput, { emit, expose }): () => JSX.Element {
        const mapRef = ref()
        const Ctl = reactive({
            map: {} as AMap.Map,
            AMap: null,
            AMapUI: null,
        })

        const params = computed(
            () =>
                ({
                    AMap: Ctl?.AMap,
                    map: Ctl?.map,
                    AMapUI: Ctl?.AMapUI,
                } as MapParms)
        )

        const pathNavigatorOutput = pathNavigator(expose, props.pathNavigator) // 固定格式

        const drivingOutput = driving(expose, props.driving)
        const initMap = async () => {
            await AMapLoader.load({
                key: '3c43abfa11d05cc6eafa913d6ee7941a', // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then(async AMap => {
                    const map = new AMap.Map(mapRef.value, {
                        //设置地图容器id
                        viewMode: '2D', //是否为3D地图模式
                        terrain: true, // 开启地形图
                        zoom: 12, //初始化地图级别
                        center: [116.379028, 39.865042], //初始化地图中心点位置
                    })
                    Ctl.AMap = AMap
                    Ctl.map = map
                    await import('../../../assets/amapui.js').then(res => {
                        Ctl.AMapUI = window.AMapUI
                    })

                    return { AMap, map }
                })
                .catch(e => {})

            // 添加功能
            props.pathNavigator && pathNavigatorOutput?.init(params.value)
            props.driving && drivingOutput?.init(params.value)
        }

        onMounted(() => {
            initMap()
        })

        return () => (
            <>
                <div
                    ref={mapRef}
                    style={props.mapStyle ?? 'width:100%;height:90vh'}
                ></div>
            </>
        )
    },
})

export default RwAmap
