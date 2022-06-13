import { FormItem } from '@/components/forms/types/formItem'
import { InputType } from '@/components/forms/YwForm/types/inputType'
export const formItems: FormItem[] = [
    {
        key: 'name',
        type: InputType.Input,
        label: '标题名称 name',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        key: 'path',
        type: InputType.Input,
        label: '路由地址 path',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        key: 'component',
        type: InputType.Input,
        label: '文件路径 component',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        key: 'icon',
        type: InputType.Input,
        label: '图标名称 icon',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
]

export const powerFormItems: FormItem[] = [
    {
        key: 'title',
        type: InputType.Input,
        label: '权限名称',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },

    {
        key: 'key',
        type: InputType.Input,
        label: '权限关键字',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },

    {
        key: 'type',
        type: InputType.Select,
        label: '权限类型',
        options: [
            {
                value: 'add',
                label: '添加',
            },
            {
                value: 'delete',
                label: '删除',
            },
            {
                value: 'edit',
                label: '修改',
            },
            {
                value: 'export',
                label: '导出',
            },
        ],
    },
]
