import RwForm from '@/components/forms/RwForm'
import RwInput from '@/components/forms/RwInput'
import { InputType } from '@/components/forms/RwForm/types/inputType'
import RwTable from '@/components/table/RwTable'
import SvgIcon from '@/components/SvgIcon/index'
import { defineComponent, reactive, ref } from 'vue'
import RwTablePage from '@/hoc/tablePage/RwTablePage'
import {
    FormItems,
    formItems2,
    tableData,
} from '@/components/forms/RwForm/datas'
// import './index.scss'
import useHttp from '@/hook/useHttp'
import RwFormStep from '@/components/forms/RwFormStep'
import { Button } from 'ant-design-vue'
import RwTree from '@/components/tree/RwTree'
import { TablePageOutput } from '@/hoc/tablePage/RwTablePage/types/tablePageOutput'
import { TablePageIutput } from '@/hoc/tablePage/RwTablePage/types/tablePagInput '

export default defineComponent({
    name: 'templatePage',
    components: {
        RwInput,
    },
    setup(props) {
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
                <Button type="primary" onClick={Ctl.sub}>
                    222
                </Button>
                {/* <div>
                    <RwForm ref={formRef} />
                </div> */}

                {/* <RwTable
                    v-slots={{
                        action: '1111',
                    }}
                /> */}
                {/* 
                <Button onClick={sub}>提交</Button>
                <SvgIcon name="iconjingweidu" size="50" color="red" /> */}

                <div>
                    <RwTablePage
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
                    <RwFormStep formItems={Ctl.formItems2} />
                </div>

                <div>
                    <RwTree />
                </div>
            </div>
        )
    },
})
