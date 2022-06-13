import YwAmap from '@/components/map/amap'
import { defineComponent, reactive, watchEffect } from 'vue'
import { FormItem } from '../types/formItem'
import { Button, Input, Row, Col, Drawer } from 'ant-design-vue'
interface Props {
    value: string
    item: FormItem
}
const YwMapPoint = defineComponent({
    name: 'YwRadio',
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
            visible: false,
            openDarwer() {
                Ctl.visible = true
            },
            closeDarwer() {
                Ctl.visible = false
            },
        })

        const button = <div>查看地图</div>

        const change = (e: any) => {
            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value))

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <>
                    <div>
                        <Input default-value="116.379028" addonBefore="经度" />
                        <Input default-value="39.865042" addonBefore="纬度" />
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
                        <YwAmap />
                    </Drawer>
                </>
            ),
        })

        return () => <>{Html.node()}</>
    },
})

export default YwMapPoint
