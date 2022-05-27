import { defineComponent, reactive, watchEffect } from 'vue'
import { Switch } from 'ant-design-vue'
import { FormItem, SwitchMode } from '../types/formItem'

interface Props {
    value: boolean
    item: FormItem
}

const RwSwitch = defineComponent({
    name: 'RwSwitch',
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: true, // 双向绑定的值尽量使用组件内部的
        })

        const SwitchMode = props.item?.InputMode as SwitchMode

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <Switch
                    v-model:checked={Ctl._value}
                    disabled={props.item?.disabled}
                    checkedChildren={SwitchMode.onText}
                    unCheckedChildren={SwitchMode.offText}
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

export default RwSwitch
