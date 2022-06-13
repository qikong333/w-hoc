import {
    defineComponent,
    reactive,
    ref,
    watch,
    watchEffect,
    computed,
} from 'vue'
// import './index.scss'
import { Button, Input, Table } from 'ant-design-vue'
import { FormItem } from '../types/formItem'
import { TableInputMode } from './types/TableInput'
import { onMounted } from 'vue'

interface Props {
    value: string
    item: FormItem
}

// type F = keyof typeof form

const YwTableInput = defineComponent({
    name: 'YwTableInput',
    emits: ['update:value', 'change'], // 必须写双向绑定，change必须写
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: {}, // 双向绑定的值尽量使用组件内部的
            loadValue() {
                const obj = {} as any
                const tableInputMode = props.item?.InputMode as TableInputMode
                const listKeys = Object.keys(tableInputMode.list)
                const rowKeys = Object.keys(tableInputMode.row)

                listKeys.forEach(key => {
                    const v = {} as any
                    rowKeys.forEach(rowKey => {
                        v[rowKey] = undefined
                    })
                    obj[key] = v
                })
                Ctl._value = obj
            },
            _row: computed(() => {
                const tableInputMode = props.item?.InputMode as TableInputMode
                const keys = Object.keys(tableInputMode.row)
                const row = keys.map(key => ({
                    title: tableInputMode.row[key],
                    dataIndex: key,
                    slots: { customRender: key },
                    align: 'center',
                }))
                return [
                    {
                        title: '',
                        dataIndex: 'list',
                        slots: { customRender: 'list' },
                        align: 'center',
                        width: '150px',
                    },
                    ...row,
                ]
            }),
            _list: [] as any[],
            loadData() {
                const tableInputMode = props.item?.InputMode as TableInputMode
                const keys = Object.keys(tableInputMode.list)
                Ctl._list = keys.map(key => ({
                    list: tableInputMode.list[key],
                    id: key,
                }))
            },
            setData(v: {}) {
                Ctl._value = v
                const tableInputMode = props.item?.InputMode as TableInputMode
                const arr = [] as any

                const nullObj = {} as any
                Object.keys(tableInputMode.row).forEach(keys => {
                    nullObj[keys] = undefined
                })

                Object.keys(tableInputMode.list).forEach(listKey => {
                    Ctl._list.forEach(ctlListItem => {
                        if (ctlListItem.list === tableInputMode.list[listKey]) {
                            arr.push({
                                ...ctlListItem,
                                ...(v[listKey] ?? nullObj),
                            })

                            Ctl._value[listKey] = v[listKey] ?? nullObj
                        }
                    })
                })

                Ctl._list = arr
                emit('update:value', Ctl._value)
                emit('change', Ctl._value)
                // Ctl._value = arr
            },
        })

        onMounted(() => {
            Ctl.loadValue()
            Ctl.loadData()
            if (props.value || props.item?.defaultValue) {
                Ctl.setData(props.value ?? props.item?.defaultValue)
            }
        })

        const tableRef = ref()
        const inputChange = (e: any, val: any) => {
            const data = {} as any
            Ctl._list.forEach(e => {
                data[e.id] = e
            })
            Ctl._value = data

            emit('update:value', Ctl._value)
            emit('change', Ctl._value)
        }
        const getTemplate = () => {
            const obj = {} as any
            Ctl._row.forEach(e => {
                e.dataIndex !== 'list' &&
                    (obj[e.dataIndex] = (e: any) => (
                        <>
                            <Input
                                v-model:value={e.record[e.column.key]}
                                onChange={(v: any) => inputChange(e, v)}
                            />
                        </>
                    ))
            })
            return obj
        }

        // 固定使用Html
        const Html = reactive({
            node: () => (
                <>
                    <Table
                        ref={tableRef}
                        pagination={false}
                        dataSource={Ctl._list}
                        // dataSource={props.item.defaultValue}
                        columns={Ctl._row}
                        v-slots={{
                            // ...listItem(), // list插槽
                            ...getTemplate(), // td插槽
                        }}
                    />
                    {/* <Button
                        onClick={() => {
                            console.log(tableRef.value)
                        }}
                    >
                        获取表格数据
                    </Button> */}
                </>
            ),
        })

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value))
        return () => <>{Html.node()}</>
    },
})

export default YwTableInput
