import YwCheckBox from '@/components/forms/YwCheckBox'
import YwForm from '@/components/forms/YwForm'
import { tableData } from '@/components/forms/YwForm/datas'
import { ModeType } from '@/components/forms/types/formItem'
import YwTable from '@/components/table/YwTable'
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

const YwTablePage = defineComponent({
    emits: ['darwerAction', 'submit'],
    props: ['config', 'form', 'talbe', 'api'],
    setup(props: TablePageIutput, { emit, slots, expose }): () => JSX.Element {
        /**Refs */
        const formRef = ref<any>(null)
        const tablemRef = ref<any>(null)

        // 固定
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
                    // 打开弹窗
                    case ActionType.add:
                    case ActionType.edit:
                    case ActionType.view:
                    case ActionType.search:
                        darwer.darwerAction(type, others?.data)
                        break

                    //TODO 刷新
                    case ActionType.refresh:
                        Ctl.tableData = await props.api?.load()
                        break

                    //TODO 导出表格方法
                    case ActionType.export:
                        const res = await props.api?.exportExcel()

                        break

                    //TODO 删除
                    case ActionType.delete:
                        await props.api?.delete()
                        Ctl.tableData = await props.api?.load()
                        break

                    //TODO 批量删除
                    case ActionType.batchDelete:
                        await props.api?.batchDelete()
                        Ctl.tableData = await props.api?.load()
                        break

                    //TODO 批量导出
                    case ActionType.batchExport:
                        await props.api?.batchExport()
                        break
                }

                // 加载动画结束
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

            /**提交 */
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
                    // 添加
                    case ActionType.add:
                        await props.api?.add()
                        Ctl.tableData = await props.api?.load()
                        break

                    // 编辑
                    case ActionType.edit:
                        await props.api?.edit()
                        Ctl.tableData = await props.api?.load()
                        break

                    // 搜索
                    case ActionType.search:
                        await props.api?.search()
                        break

                    default:
                        break
                }
            },
        })

        // 获取路由名称
        const route = useRoute()
        const getTitle = () => {
            return props.table?.title ?? route.name
        }

        // 表头多选相关
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

        // 获取表头的key
        headerCheckCtl.checkedList = Ctl._config
            .filter((r: FormItem) => r.mode?.includes('table'))
            .map((r: FormItem) => r.key)
        console.log(headerCheckCtl.checkedList)

        // 多选html
        const headCheckBox = (
            <>
                <YwCheckBox
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

        // 初始化方法
        const init = async () => {
            Ctl.tableData = await props.api?.load()
        }
        init()

        // 监听数据的改变
        watchEffect(() => (Ctl.tableData = props.table?.tableData ?? []))

        // 外抛事件
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
                <YwTable
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
                        <YwForm
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

export default YwTablePage
