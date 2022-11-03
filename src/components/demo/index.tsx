import { defineComponent, reactive } from 'vue'
import s from './index.module.scss'
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
        expose({ a: 1, b: () => Ctl.xxx } as XxxOutput)

        // 返回html部分
        return () => <div class={s.bg}>asdfadf</div>
    },
})

export default useDome
