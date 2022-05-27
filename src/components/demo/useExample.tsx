import { defineComponent, reactive, ref } from 'vue'
import useDome from '.'
import { XxxOutput } from './types/output'

export default defineComponent({
    name: 'useDome',
    components: { useDome },
    setup(props) {
        // 固定使用Ctl，内部响应式变量
        const Ctl = reactive({
            xxx: '',
        })

        const Ref = reactive({
            domeRef: ref<XxxOutput>(),
        })

        // 调用组件的方法
        // Ref.domeRef?.a

        // 返回html部分
        return () => (
            <>
                <useDome ref={Ref.domeRef} />
            </>
        )
    },
})
