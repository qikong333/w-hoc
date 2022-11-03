import { FormItem } from '../types/formItem'
import { InputType } from './types/inputType'
export const FormItems: FormItem[] = [
    {
        defaultValue: '123123',
        key: 'name',
        type: InputType.Input,
        label: '名字',
        style: {
            color: 'red',
        },
        linkTo: 'age',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        // headerHide: true,
        defaultValue: [1, 2],
        key: 'sex',
        type: InputType.Select,
        label: '性别',
        options: [
            { value: 1, label: '男' },
            { value: 2, label: '女' },
        ],
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        // headerHide: true,
        defaultValue: [1, 2],
        key: 'sex',
        type: InputType.Select,
        label: '性别',
        InputMode: 'multiple',
        options: [
            { value: 1, label: '男' },
            { value: 2, label: '女' },
        ],
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        defaultValue: '777',
        key: 'age',
        type: InputType.InputNumber,
        label: '年龄',
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        defaultValue: '2',
        key: 'sport',
        type: InputType.Radio,
        label: '喜欢的运动',
        options: [
            { value: '1', label: '篮球' },
            { value: '2', label: '足球' },
        ],
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        defaultValue: ['1', '2'],
        key: 'food',
        type: InputType.Checkbox,
        label: '喜欢的食物',
        options: [
            { value: '1', label: '中华料理' },
            { value: '2', label: '韩料' },
            { value: '3', label: '日料' },
        ],
        rules: [
            {
                required: true,
                message: 'Please select region',
            },
        ],
    },
    {
        defaultValue: true,
        key: 'water',
        type: InputType.Switch,
        label: '喝水',
        InputMode: {
            onText: '开',
            offText: '关',
        },
    },
    {
        defaultValue: '2022-11-11 11:11:11',
        key: 'date',
        type: InputType.DatePicker,
        label: '日期',
        InputMode: {
            showTime: true,
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
    },
    {
        defaultValue: ['2021-11-12 12:12:12', '2022-01-01 1:2:3'],
        key: 'date2',
        type: InputType.RangePicker,
        label: '日期范围',
        InputMode: {
            showTime: true,
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
    },
    {
        defaultValue: '11:11:11',
        key: 'date3',
        type: InputType.TimePicker,
        label: '时间',
        InputMode: {
            valueFormat: 'HH:mm:ss',
        },
    },

    {
        key: 'img',
        type: InputType.Upload,
        label: '图片上传',
    },
    // {
    //     defaultValue: {
    //         a1: { a: '1', b: '2', c: '3', d: '4', e: '5' },
    //         b1: { a: '1', b: '2', c: '3', d: '4', e: '5' },
    //     },
    //     key: 'tableinput',
    //     type: InputType.TableInput,
    //     label: '表格输入框',
    //     InputMode: {
    //         row: {
    //             a: '第一天',
    //             b: '第二天',
    //             c: '第三天',
    //             d: '第四天',
    //             e: '第五天',
    //         },
    //         list: { a1: '水', b1: '肥料', c1: '日照', d1: '温度', e1: '湿度' },
    //     },
    // },
]

export const formData = {
    name: '232123',
}

export const tableData = [
    {
        id: 1,
        name: '232123',
        sex: [1, 2],
        age: '777',
        sport: '1',
        food: ['1', '2'],
        water: 1,
        date: '2022-11-11 11:11:11',
        date2: ['2021-11-12 12:12:12', '2022-01-01 1:2:3'],
        date3: '11:11:11',
    },
]

export const formItems2 = [
    [
        {
            key: 'name11',
            type: InputType.Input,
            label: '名字111111',
            style: {
                color: 'red',
            },
            rules: [
                {
                    required: true,
                    message: 'Please select 11111',
                },
            ],
        },
    ],
    [
        {
            key: 'name12222',
            type: InputType.Input,
            label: '名字222221',
            style: {
                color: 'red',
            },
            rules: [
                {
                    required: true,
                    message: 'Please select 2222222',
                },
            ],
        },
    ],
    FormItems,
]
