import { defineComponent, reactive } from 'vue'
import './index.scss'
import { XxxInput } from './types/input'
import { XxxOutput } from './types/output'

const useDome = defineComponent({
    props: ['a', 'b'],
    setup(props: XxxInput, { expose }) {
        // 固定使用Ctl，内部响应式变量
        const Ctl = reactive({
            xxx: '',
        })

        // 组件返回的值
        expose({ getXxx: () => Ctl.xxx })

        // 返回html部分
        return () => <div>asdfadf</div>
    },
})

export default useDome
