import { defineComponent, reactive, watchEffect, watch } from 'vue'
import { Checkbox, Form } from 'ant-design-vue'
import { FormItem } from '../types/formItem'

interface Props {
    value: string
    item: FormItem
}

const CheckboxGroup = Checkbox.Group

const RwCheckBox = defineComponent({
    name: 'RwCheckBox',
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
            indeterminate: true,
            checkAll: false,
        })

        const FormItemRestNode = Form.ItemRest
        // 固定使用Html
        const Html = reactive({
            node: () => (
                <div>
                    <div v-show={true}>
                        <FormItemRestNode>
                            <Checkbox
                                v-model:checked={Ctl.checkAll}
                                indeterminate={Ctl.indeterminate}
                                onChange={onCheckAllChange}
                            >
                                全选
                            </Checkbox>
                        </FormItemRestNode>
                    </div>
                    <CheckboxGroup
                        v-model:value={Ctl._value}
                        options={props.item?.options || []}
                        onChange={change}
                    />
                </div>
            ),
        })

        const change = (e: any) => {
            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }

        const onCheckAllChange = (e: any) => {
            const arr: Array<string | number> = []
            props.item.options?.map(val => {
                arr.push(val.value)
            })
            Object.assign(Ctl, {
                _value: e.target.checked ? arr : [],
                indeterminate: false,
            })
            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }

        watch(
            () => Ctl._value,
            val => {
                Ctl.indeterminate =
                    !!val.length && val.length < props.item.options.length
                Ctl.checkAll = val.length === props.item.options.length
            }
        )

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value ?? []))
        return () => <>{Html.node()}</>
    },
})

export default RwCheckBox
