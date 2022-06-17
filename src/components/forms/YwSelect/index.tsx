import { defineComponent, reactive, watchEffect } from 'vue'
import { Select } from 'ant-design-vue'
import { FormItem, SelectMode } from '../types/formItem'

interface Props {
    value: string
    item: FormItem
}

// type F = keyof typeof form

const YwSelect = defineComponent({
    name: 'YwSelect',
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
                <Select
                    disabled={props.item?.disabled}
                    allowClear
                    show-search
                    mode={props.item?.InputMode as SelectMode}
                    optionFilterProp="label"
                    placeholder={props.item?.placeholder}
                    v-model:value={Ctl._value}
                    options={props.item?.options}
                    onChange={change}
                />
            ),
        })

        const change = (e: any) => {
            console.log(Ctl._value)

            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value))
        return () => <>{Html.node()}</>
    },
})

export default YwSelect
