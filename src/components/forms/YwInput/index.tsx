import { defineComponent, reactive, ref, watch, watchEffect } from 'vue'
import './index.scss'
import { Input } from 'ant-design-vue'
import { FormItem } from '../types/formItem'

interface Props {
    value: string
    item: FormItem
}

// type F = keyof typeof form

const YwInput = defineComponent({
    name: 'YwInput',
    emits: ['update:value', 'change'], // 必须写双向绑定，change必须写
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
        })

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <Input
                    disabled={props.item?.disabled}
                    allowClear
                    placeholder={props.item?.placeholder}
                    v-model:value={Ctl._value}
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

export default YwInput
