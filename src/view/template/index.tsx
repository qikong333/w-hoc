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
// import './index.scss'
import useHttp from '@/hook/useHttp'
import YwFormStep from '@/components/forms/YwFormStep'
import { Button } from 'ant-design-vue'
import YwTree from '@/components/tree/YwTree'
import { TablePageOutput } from '@/hoc/tablePage/YwTablePage/types/tablePageOutput'
import { TablePageIutput } from '@/hoc/tablePage/YwTablePage/types/tablePagInput '
import getConfig from '@/utils/common/getConfig'

export default defineComponent({
    name: 'templatePage',
    components: {
        YwInput,
    },
    setup(props) {
        console.log(getConfig().aa)
        // // get例子
        // useHttp({
        //     baseURL: 'http://192.168.0.80:8096/',
        //     timeout: 5000,
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     },
        // })
        //     .get('/rbac/role/index', {
        //         token: 'PzyRSFbbwjFp55XZi0IW4O0Y4gGA4x-U_1641864668',
        //         page: 1,
        //         'per-page': 20,
        //     })
        //     .then(res => {
        //         console.log(res)
        //     })

        // // post例子
        // useHttp({
        //     baseURL: 'http://192.168.0.80:8096/',
        //     timeout: 5000,
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     },
        // })
        //     .post('/job/enableds', {
        //         token: 'PzyRSFbbwjFp55XZi0IW4O0Y4gGA4x-U_1641864668',
        //         ids: '12',
        //     })
        //     .then(res => {
        //         console.log(res)
        //     })

        // import.meta.env.VITE_APP_WEB_URL

        const formRef = ref<any>(null)

        const config: TablePageIutput = reactive({
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

                {/* <div>
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
                <div>
                    <YwFormStep formItems={Ctl.formItems2} />
                </div>

                <div>
                    <YwTree />
                </div> */}
            </div>
        )
    },
})
