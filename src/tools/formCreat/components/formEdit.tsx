import router from '@/router'
import baseRouter from '@/router/baseRouter'
import { Col, Row, Tree, Button } from 'ant-design-vue'
import { InputType } from '../../../components/forms/YwForm/types/inputType'
import { defineComponent, reactive, ref } from 'vue'
import bus from '@/utils/common/mitt'
import { FormItem } from '../../../components/forms/types/formItem'
interface props {}

export default defineComponent({
    setup(props: props, { emit, expose }): () => JSX.Element {
        // const power = reactive({
        //     configList: [] as FormItem[],
        // })

        const configList = ref<FormItem[]>([])

        function addType() {
            bus.$on('formCreat_add', (type: InputType) => {
                console.log(type)
            })
        }

        addType()

        return () => <></>
    },
})
