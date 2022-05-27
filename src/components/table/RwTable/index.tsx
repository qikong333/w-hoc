import { computed, defineComponent, reactive, watchEffect } from 'vue'
import './index.scss'
import { Button, Pagination, Table } from 'ant-design-vue'
import { apiType } from '../../forms/types/types'

// import { FormItems, tableData } from '@/components/forms/RwForm/datas'
import { FormItem } from '@/components/forms/types/formItem'
import viewElement from '@/components/forms/RwForm/viewElement'
// import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { TableConfig } from './type'
import { useRoute } from 'vue-router'
import { TableInput } from './types/tableInput'
import { TableOutput } from './types/tableOutput'
import ActionType from '@/hoc/tablePage/RwTablePage/types/action'

interface Slots {
    action: any
}

// type Key = ColumnProps['key']

const RwTable = defineComponent({
    name: 'RwTable',
    emits: ['darwerAction'],
    props: [
        'api',
        'noPage',
        'rowKey',
        'noOperation',
        'title',
        'tableItems',
        'loading',
        'tableData',
        'total',
    ],
    setup(props: TableInput, { emit, slots, expose }): () => JSX.Element {
        const Ctl = reactive({
            // tableItems: FormItems, // 配置数据
            pageSize: 20,
            pageIndex: 1,
            selectRows: [] as any[], // 选中数据
            loading: false,
        })

        // 配置数据
        const columns = computed(() => {
            const arr = props.tableItems.map((r: FormItem) => ({
                title: r.label,
                dataIndex: r.key,
                key: r.key,
                slots: { customRender: r.key },
                align: 'center',
                // ellipsis: true,  // 自动显示...
            }))

            return [
                ...arr,
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    slots: { customRender: 'action' },
                    align: 'center',
                },
            ]
        })

        const pagination = computed(() => ({
            total: props.total,

            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40', '50'],
        }))

        const darwerAction = (type: ActionType, data: any): any => {
            emit('darwerAction', { type, data })
        }

        const rowSelection = {
            onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
                console.log(
                    `selectedRowKeys: ${selectedRowKeys}`,
                    'selectedRows: ',
                    selectedRows
                )

                Ctl.selectRows = selectedRows
            },
            // getCheckboxProps: (record: any) => ({
            //     disabled: record.name === 'Disabled User',
            //     name: record.name,
            // }),
        }

        // 输出td
        const getTemplate = () => {
            const obj = {} as any
            props.tableItems.forEach(r => {
                obj[r.key] = (event: any) => viewElement(r, event.record)
            })

            return obj
        }

        // 操作栏
        const actionItem = () => {
            return {
                action: (e: any) =>
                    slots.action ? (
                        slots.action(e)
                    ) : (
                        <>
                            <Button
                                onClick={() => darwerAction(ActionType.view, e)}
                            >
                                查看
                            </Button>
                            <Button
                                onClick={() => darwerAction(ActionType.edit, e)}
                            >
                                修改
                            </Button>
                            <Button
                                onClick={() =>
                                    darwerAction(ActionType.delete, e)
                                }
                            >
                                删除
                            </Button>
                        </>
                    ),
            }
        }

        expose({
            selectRows: () => Ctl.selectRows,
            getPage: () => ({
                pageSize: Ctl.pageSize,
                pageIndex: Ctl.pageIndex,
            }),
            resetPage: () => {
                Ctl.pageSize = 20
                Ctl.pageIndex = 1
            },
            setLoad: (v: boolean) => {
                Ctl.loading = v
            },
        } as TableOutput)

        watchEffect(() => (Ctl.loading = props.loading))

        return () => (
            <>
                <Table
                    rowKey={props.rowKey ?? 'id'}
                    row-selection={rowSelection}
                    dataSource={props.tableData}
                    columns={columns.value}
                    pagination={false}
                    loading={Ctl.loading}
                    v-slots={{
                        ...getTemplate(), // td插槽
                        ...actionItem(), // 操作插槽
                    }}
                ></Table>
                {!props.noPage && (
                    <Pagination
                        show-total={(total: any) => <span>共{total}条</span>}
                        v-model:current={Ctl.pageIndex}
                        v-model:pageSize={Ctl.pageSize}
                        {...pagination.value}
                        v-slots={{
                            buildOptionText: (e: any) => (
                                <span>{e.value}条/页</span>
                            ),
                        }}
                    />
                )}
            </>
        )
    },
})

export default RwTable