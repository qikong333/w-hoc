import RwMapBox from '@/components/map/mapbox'
import { defineComponent, reactive, ref } from 'vue'

import './index.scss'
import { Input } from 'ant-design-vue'

export default defineComponent({
    components: { RwMapBox },
    setup(props) {
        const Ctl = reactive({
            v1: 113.752002,
            v2: 23.020814,
        })

        return () => (
            <>
                <Input type="text" v-model:value={Ctl.v1} />
                <Input type="text" v-model:value={Ctl.v2} />
                <RwMapBox points={[Ctl.v1, Ctl.v2]} />
            </>
        )
    },
})
