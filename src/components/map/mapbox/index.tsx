import { defineComponent, reactive, ref, onMounted } from 'vue'
import './index.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapbox from 'mapbox-gl'
import a from './mixin/a'
import newMap from './utils/init'
import point from './utils/point'

interface Porp {
    // points: []
}

const RwMapBox = defineComponent({
    props: {
        points: {
            type: Array,
            default: () => [113.752002, 23.020814],
        },
    },
    // mixins: [a],
    setup(props: Porp) {
        const Ctl = reactive({
            map: null as any,
        })
        console.log(props)

        onMounted(() => {
            Ctl.map = newMap()
            Ctl.map.on('load', () => {
                // 添加hook方法
                point(Ctl.map, props)
            })
        })

        return () => (
            <>
                <div id="mapBoxC"></div>
                {/* <pre id="features"></pre> */}
            </>
        )
    },
})

export default RwMapBox
