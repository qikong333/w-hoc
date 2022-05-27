import { defineComponent, reactive, watchEffect } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { FormItem } from '../types/formItem'

interface Props {
    value: string
    item: FormItem
}

const RwInputNumber = defineComponent({
    name: 'RwInputNumber',
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
        })

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <InputNumber
                    style={'width: 100%'}
                    v-model:value={Ctl._value}
                    disabled={props.item?.disabled}
                    placeholder={props.item?.placeholder}
                    min={props.item?.min}
                    max={props.item?.max}
                    onChange={change}
                />
            ),
        })

        const change = (e: any) => {
            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value))
        return () => <>{Html.node()}</>
    },
})

export default RwInputNumber
