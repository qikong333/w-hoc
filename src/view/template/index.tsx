import YwForm from '@/components/forms/YwForm'
import YwInput from '@/components/forms/YwInput'
import { InputType } from '@/components/forms/YwForm/types/inputType'
import YwTable from '@/components/table/YwTable'
import SvgIcon from '@/components/SvgIcon/index'
import { defineComponent, reactive, ref } from 'vue'
import YwTablePage from '@/hoc/tablePage/YwTablePage'
import {
    FormItems,
    formItems2,
    tableData,
} from '@/components/forms/YwForm/datas'
import useHttp from '@/hook/useHttp'
import YwFormStep from '@/components/forms/YwFormStep'
import { Button } from 'ant-design-vue'
import YwTree from '@/components/tree/YwTree'
import { TablePageOutput } from '@/hoc/tablePage/YwTablePage/types/tablePageOutput'
import { TablePageIutput } from '@/hoc/tablePage/YwTablePage/types/tablePagInput '
import YwMenu from '@/components/YwMenu'
import i18n from '@/lang'

export default defineComponent({
    name: 'templatePage',
    components: {
        YwInput,
        YwMenu,
    },
    setup(props) {
        const formRef = ref<any>(null)

        const config = reactive({
            config: FormItems,
            form: {},
            table: {
                rowKey: 'id',
                tableData: tableData,
            },
            api: {
                load: async () => {
                    console.log('load')
                    return tableData
                },
                add: async () => {
                    console.log('add')
                },
                edit: async () => {
                    console.log('edit')
                },
                delete: async () => {
                    console.log('delete')
                },
                view: async () => {
                    console.log('view')
                },
                search: async () => {
                    console.log('search')
                },
                exportExcel: async () => {
                    console.log('exportExcel')
                },
                batchDeletion: async () => {
                    console.log('batchDeletion')
                },
            },
        })
        const a = ref('')

        const tablePage = ref<TablePageOutput | null>(null)

        const Ctl = reactive({
            formItems2,
            sub: async () => {
                console.log(tablePage?.value?.getPage())
            },
        })
        return () => (
            <div>
                {i18n.global.t('xx')}
                <div>
                    <YwMenu />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div>
                    <YwForm
                        ref={formRef}
                        config={{
                            labelCol: 8,
                            wrapperRol: 18,
                            layout: 'inline',
                        }}
                    />
                </div>
                {/* <YwTable
                    v-slots={{
                        action: '1111',
                    }}
                /> */}
                {/* <Button onClick={sub}>提交</Button> */}
                {/* <SvgIcon name="iconjingweidu" size="50" color="red" /> */}
                <a-divider />
                <br />
                <br />
                <br />
                <br />

                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <YwTablePage
                        ref={tablePage}
                        {...config}
                        v-slots={
                            {
                                // view: 1111,
                                // edit: 2222,
                                // search: 333,
                                // add: 444,
                            }
                        }
                    />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div>
                    <YwFormStep formItems={Ctl.formItems2} />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div>
                    <YwTree />
                </div>
            </div>
        )
    },
})
