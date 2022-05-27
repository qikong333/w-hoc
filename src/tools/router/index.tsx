import router from '@/router'
import baseRouter from '@/router/baseRouter'
import { Col, Row, Tree, Button } from 'ant-design-vue'
import {
    defineComponent,
    reactive,
    ref,
    computed,
    watchEffect,
    watch,
} from 'vue'
import RwForm from '../../components/forms/RwForm/index'
import { formItems, powerFormItems } from './config'
import { FormOutput } from '../../components/forms/RwForm/types/formOutput'
interface props {}

const routerTool = defineComponent({
    setup(props: props, { emit, expose }): () => JSX.Element {
        const tree = reactive({
            selectedKeys: [] as string[],
            onSelect(selectedKeys: string[], info: any) {
                console.log('selected', selectedKeys, info)
                tree.selectedKeys = selectedKeys
            },
            onCheck(checkedKeys: string[], info: any) {
                console.log('onCheck', checkedKeys, info)
                tree.selectedKeys = checkedKeys
            },
            treeSelectItem: computed(() =>
                routers.value.find(r => r.name === tree.selectedKeys[0])
            ),
        })

        const routers = ref([...baseRouter])

        const power = reactive({
            data: [
                {
                    title: undefined,
                    key: undefined,
                    type: undefined,
                },
            ],
            addPower() {
                power.data = [
                    {
                        title: undefined,
                        key: undefined,
                        type: undefined,
                    },
                    ...power.data,
                ]
            },
        })

        const formRef = ref<FormOutput>()
        const form = reactive({
            data: computed(() => formRef.value?.getForm()),
            getf() {
                console.log(formRef.value?.getForm())
            },
        })

        watch(
            () => form.data,

            () => {
                console.log(form.data)
            },
            {
                deep: true,
            }
        )

        return () => (
            <>
                <Row>
                    <Col span={6}>
                        {JSON.stringify(tree.treeSelectItem)}

                        <Tree
                            onSelect={(selectedKeys: string[], info: any) =>
                                tree.onSelect(selectedKeys, info)
                            }
                            replaceFields={{
                                children: 'children',
                                title: 'name',
                                key: 'name',
                            }}
                            show-icon
                            default-expand-all
                            tree-data={routers.value}
                        ></Tree>
                    </Col>
                    <Col span={12}>
                        {JSON.stringify(form.data)}
                        <div>
                            <Button onClick={form.getf}>添加同级</Button>

                            <Button>添加子级</Button>
                        </div>
                        <div>
                            <RwForm formItems={formItems} ref={formRef} />
                            power:
                            <Button onClick={power.addPower}>添加权限</Button>
                            {power.data.map((item, index) => (
                                <RwForm
                                    ref={'power' + index}
                                    formItems={powerFormItems}
                                    formData={item}
                                    onChange={e => (power.data[index] = e)}
                                />
                            ))}
                        </div>
                    </Col>
                    <Col span={6}>
                        <json-viewer value={routers.value} />
                    </Col>
                </Row>
            </>
        )
    },
})

export default routerTool
