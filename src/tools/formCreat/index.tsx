import { InputType } from '@/components/forms/YwForm/types/inputType'
import router from '@/router'
import baseRouter from '@/router/baseRouter'
import bus from '@/utils/common/mitt'
import { Col, Row, Tree, Button } from 'ant-design-vue'
import {
    defineComponent,
    reactive,
    ref,
    computed,
    watchEffect,
    watch,
} from 'vue'
import FormEdit from './components/formEdit'
import List from './components/list'
interface props {}

export default defineComponent({
    setup(props: props, { emit, expose }): () => JSX.Element {
        const power = reactive({})

        // function getType(type:InputType) {

        // }

        return () => (
            <>
                <Row>
                    <Col span={4}>
                        <List />
                    </Col>
                    <Col span={16}>
                        <FormEdit />
                    </Col>
                    <Col span={4}>11</Col>
                </Row>

                <div class="flex">
                    <div class="basis-1/2">12121</div>
                    <div class="basis-1/2">22222</div>
                </div>
            </>
        )
    },
})
