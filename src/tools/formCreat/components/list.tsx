import router from '@/router'
import baseRouter from '@/router/baseRouter'
import { Col, Row, Tree, Button } from 'ant-design-vue'
import { InputType } from '../../../components/forms/YwForm/types/inputType'
import {
    defineComponent,
    reactive,
    ref,
    computed,
    watchEffect,
    watch,
} from 'vue'
import bus from '@/utils/common/mitt'
interface props {}

export default defineComponent({
    emits: ['add'],
    setup(props: props, { emit, expose }): () => JSX.Element {
        const power = reactive({})

        const menu = [
            {
                name: '输入型组件',
                icon: '',
                children: [
                    {
                        name: '单行文本',
                        icon: '',
                        type: InputType.Input,
                    },
                    {
                        name: '多行文本',
                        icon: '',
                        type: InputType.Textarea,
                    },
                    {
                        name: '计数器',
                        icon: '',
                        type: InputType.InputNumber,
                    },
                    {
                        name: '范围计数器',
                        icon: '',
                        type: InputType.InputNumberRange,
                    },
                    {
                        name: '密码',
                        icon: '',
                        type: InputType.Password,
                    },
                ],
            },
            {
                name: '选择型组件',
                icon: '',
                children: [
                    {
                        name: '下拉选择',
                        icon: '',
                        type: InputType.Select,
                    },
                    {
                        name: '树形下拉',
                        icon: '',
                        type: InputType.TreeSelect,
                    },
                    {
                        name: '级联下拉框',
                        icon: '',
                        type: InputType.Cascader,
                    },
                    {
                        name: '复选框',
                        icon: '',
                        type: InputType.Checkbox,
                    },
                    {
                        name: '单选框',
                        icon: '',
                        type: InputType.Radio,
                    },
                    {
                        name: '数字范围框',
                        icon: '',
                        type: InputType.TimePicker,
                    },
                    {
                        name: '单个时间',
                        icon: '',
                        type: InputType.DatePicker,
                    },
                    {
                        name: '时间范围',
                        icon: '',
                        type: InputType.RangePicker,
                    },
                ],
            },
        ]

        function add(type: InputType) {
            bus.$emit('formCreat_add', type)
        }

        return () => (
            <>
                {menu.map(item => {
                    return (
                        <Row>
                            <Col span={24}>{item.name}</Col>
                            {item.children.map(child => {
                                return (
                                    <Col span={12}>
                                        <Button onClick={() => add(child.type)}>
                                            {child.name}
                                        </Button>
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}
            </>
        )
    },
})
