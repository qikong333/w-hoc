import YwAmap from '@/components/map/amap'
import { defineComponent, reactive, watchEffect } from 'vue'
import { FormItem } from '../types/formItem'
import {
    Button,
    Input,
    Row,
    Col,
    Drawer,
    Modal,
    Textarea,
} from 'ant-design-vue'
interface Props {
    value: string
    item: FormItem
}
const MapRange = defineComponent({
    name: 'YwRadio',
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
            textareaValue: '',
            visible: false,
            visibleModal: false,
            openDarwer() {
                Ctl.visible = true
            },
            closeDarwer() {
                Ctl.visible = false
            },
            openModal() {
                Ctl.visibleModal = true
            },
            closeModal() {
                Ctl.visibleModal = false
            },
            handleOk() {
                Ctl.visibleModal = false
            },
        })

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <>
                    <div>
                        {/* <Textarea /> */}
                        <Button onClick={Ctl.openModal}>导入区域数据</Button>
                        <Button onClick={Ctl.openDarwer}>打开地图工具</Button>
                        <YwAmap
                            mapStyle={{ height: '200px', width: '200px' }}
                        />
                    </div>
                    <Drawer
                        width={'100vw'}
                        visible={Ctl.visible}
                        title="地图工具"
                        onClose={Ctl.closeDarwer}
                    >
                        123123
                    </Drawer>
                    <Modal
                        v-model:visible={Ctl.visibleModal}
                        title="Basic Modal"
                        onOk={Ctl.handleOk}
                    >
                        {/* <Textarea v-model:value={Ctl.textareaValue} /> */}
                    </Modal>
                </>
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

export default MapRange
