import RwCheckBox from '@/components/forms/RwCheckBox'
import RwForm from '@/components/forms/RwForm'
import { tableData } from '@/components/forms/RwForm/datas'
import { ModeType } from '@/components/forms/types/formItem'
import RwTable from '@/components/table/RwTable'
import { Button, Checkbox, Drawer, Popover } from 'ant-design-vue'
import {
    computed,
    defineComponent,
    reactive,
    ref,
    watch,
    onMounted,
    watchEffect,
} from 'vue'
import { useRoute } from 'vue-router'
import { FormItem } from '../../../components/forms/types/formItem'
import ActionType from './types/action'
import { TablePageOutput } from './types/tablePageOutput'
import { TablePageIutput } from './types/tablePagInput '

const RwTablePage = defineComponent({
    emits: ['darwerAction', 'submit'],
    props: ['config', 'form', 'talbe', 'api'],
    setup(props: TablePageIutput, { emit, slots, expose }): () => JSX.Element {
        /**Refs */
        const formRef = ref<any>(null)
        const tablemRef = ref<any>(null)

        const Ctl = reactive({
            _config: computed(() => {
                const modes: ModeType[] = [
                    'view',
                    'edit',
                    'add',
                    'table',
                    'search',
                    'excel',
                ]
                return props.config.map((r: any) => {
                    !r.mode && (r.mode = modes)
                    return r
                })
            }),
            page: () => tablemRef,
            /**表单数据 */
            tableData: [],
            /**表格配置集合 */
            tableConfigItems: [] as FormItem[],
            /**加载状态 */
            loading: false as boolean,
            /**触发状态 */
            actionType: ActionType.add as ActionType,
            /**刷新表格 */
            refresh() {
                Ctl.action({ type: ActionType.refresh })
            },
            /**触发状态事件 */
            action: async ({
                type,
                ...others
            }: {
                type: ActionType
                [key: string]: any
            }) => {
                // console.log(type, others)
                Ctl.loading = true
                Ctl.actionType = type

                switch (type) {
                    case ActionType.add:
                    case ActionType.edit:
                    case ActionType.view:
                    case ActionType.search:
                        // 打开弹窗
                        darwer.darwerAction(type, others?.data)
                        break

                    case ActionType.refresh:
                        Ctl.tableData = await props.api?.load()
                        break

                    case ActionType.export:
                        const res = await props.api?.exportExcel()
                        //TODO 导出表格方法
                        break

                    case ActionType.delete:
                        await props.api?.delete()
                        Ctl.tableData = await props.api?.load()
                        break

                    case ActionType.batchDelete:
                        await props.api?.batchDelete()
                        Ctl.tableData = await props.api?.load()
                        break

                    case ActionType.batchExport:
                        await props.api?.batchExport()
                        break
                }

                Ctl.loading = false
            },
        })

        /**过滤表单的配置 */
        Ctl.tableConfigItems = Ctl._config.filter((r: FormItem) =>
            r.mode?.includes('table')
        )

        /**弹框集合 */
        const darwer = reactive({
            /**弹框状态 */
            visible: false,
            onClose() {
                darwer.visible = false
            },
            /**弹窗事件 */
            darwerAction(type: ActionType, data?: any) {
                console.log(type, data)

                // 用于自定义表单扩展
                emit('darwerAction', { type, data })

                darwer.visible = true
            },

            async submit() {
                // 用于自定义表单扩展
                if (!formRef.value) {
                    if (
                        Ctl.actionType === ActionType.add ||
                        Ctl.actionType === ActionType.edit ||
                        Ctl.actionType === ActionType.search
                    ) {
                        emit('submit', {
                            type: Ctl.actionType,
                        })
                    }

                    return
                }

                // 正常提交
                // const { getForm, validate } = useForm(formRef.value)
                await formRef.value.validate()

                switch (Ctl.actionType) {
                    case ActionType.add:
                        await props.api?.add()
                        Ctl.tableData = await props.api?.load()
                        break
                    case ActionType.edit:
                        await props.api?.edit()
                        Ctl.tableData = await props.api?.load()
                        break
                    case ActionType.search:
                        await props.api?.search()
                        break

                    default:
                        break
                }
            },
        })

        const route = useRoute()
        const getTitle = () => {
            return props.table?.title ?? route.name
        }

        // 表头多选
        const headerCheckCtl = reactive({
            checkAll: false,
            indeterminate: true,
            checkedList: [] as string[],
            plainOptions: computed(() => {
                return Ctl._config
                    .filter((r: FormItem) => r.mode?.includes('table'))
                    .map((r: FormItem) => ({
                        label: r.label,
                        value: r.key,
                    }))
            }),
            onCheckAllChange(e: any) {
                Object.assign(headerCheckCtl, {
                    checkedList: e.target.checked
                        ? headerCheckCtl.plainOptions
                        : [],
                    indeterminate: false,
                })
            },
            changeHeaders(val: string[]) {
                Ctl.tableConfigItems.forEach((item: FormItem) => {
                    item.headerHide = !val.includes(item.key)
                })
            },
        })

        headerCheckCtl.checkedList = Ctl._config
            .filter((r: FormItem) => r.mode?.includes('table'))
            .map((r: FormItem) => r.key)

        console.log(headerCheckCtl.checkedList)

        const headCheckBox = (
            <>
                <RwCheckBox
                    onChange={headerCheckCtl.changeHeaders}
                    item={{
                        key: 'checkValue',
                        options: headerCheckCtl.plainOptions,
                    }}
                    value={headerCheckCtl.checkedList}
                />
            </>
        )

        const button = reactive({
            sub: () => {
                console.log(tablemRef.value.getPage())
            },
        })

        const init = async () => {
            Ctl.tableData = await props.api?.load()
        }
        init()

        watchEffect(() => (Ctl.tableData = props.table?.tableData ?? []))

        expose({
            setLoad(v: boolean) {
                Ctl.loading = v
            },
            getPage: () => tablemRef.value.getPage(),
        } as TablePageOutput)

        return () => (
            <>
                <Button type="primary" onClick={button.sub}>
                    111
                </Button>
                <span>{getTitle()}</span>
                {props.api.add && (
                    <Button
                        onClick={() => Ctl.action({ type: ActionType.add })}
                    >
                        添加
                    </Button>
                )}
                <Button
                    onClick={() => Ctl.action({ type: ActionType.refresh })}
                >
                    刷新
                </Button>
                {props.api.exportExcel && (
                    <Button
                        onClick={() => Ctl.action({ type: ActionType.export })}
                    >
                        导出
                    </Button>
                )}
                {props.api.search && (
                    <Button
                        onClick={() => Ctl.action({ type: ActionType.search })}
                    >
                        高级搜索
                    </Button>
                )}
                <Button
                    onClick={() => Ctl.action({ type: ActionType.batchDelete })}
                >
                    删除
                </Button>
                <Button
                    onClick={() =>
                        Ctl.actiosn({ type: ActionType.batchExport })
                    }
                >
                    导出
                </Button>
                <Popover
                    trigger="click"
                    content={headCheckBox}
                    placement="bottom"
                >
                    <Button>表头</Button>
                </Popover>
                <RwTable
                    tableItems={Ctl.tableConfigItems.filter(
                        (r: FormItem) => !r.headerHide
                    )}
                    // tableData={tableData}
                    tableData={Ctl.tableData}
                    onDarwerAction={Ctl.action}
                    ref={tablemRef}
                    {...props.table}
                    loading={Ctl.loading}
                />
                <Drawer
                    maskClosable={false}
                    destroyOnClose
                    title="Create a new account"
                    width="45%"
                    visible={darwer.visible}
                    body-style={{ paddingBottom: '80px' }}
                    onClose={darwer.onClose}
                >
                    {slots[Ctl.actionType] ? (
                        slots[Ctl.actionType] && slots[Ctl.actionType]()
                    ) : (
                        <RwForm
                            formItems={Ctl._config}
                            mode={Ctl.actionType}
                            ref={formRef}
                        />
                    )}
                    {Ctl.actionType !== ActionType.view && (
                        <Button onClick={darwer.submit}>提交</Button>
                    )}
                </Drawer>
            </>
        )
    },
})

export default RwTablePage
