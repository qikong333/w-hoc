import { TableInputMode } from '../YwTableInput/types/TableInput'
import { InputType } from '../YwForm/types/inputType'

export type ModeType = 'view' | 'edit' | 'add' | 'table' | 'search' | 'excel'
/*** 下拉模式（multiple-多选、tags-标签）*/
export type SelectMode = 'multiple' | 'tags' | 'combobox'
/*** 开关文字描述*/
export type SwitchMode = {
    onText?: string
    offText?: string
}
/**
 * 日期选择器
 * showTime: 是否显示时间（时分秒）
 * valueFormat：值的格式（YYYY-MM-DD HH:mm:ss）
 */
export type DatePickerMode = {
    showTime?: boolean
    valueFormat?: string
}

export interface FormItem {
    //   -----------------------------------------------公用 FromItem--------------------------------------------
    /**
     *   // 样式
     */
    innerHtml?: any
    /**
     *   // Html 等级大于form和style，设置的话会覆盖他们两个
     */
    style?: { [key: string]: any }
    /**
     *  表单label名称,表头名称
     */
    label?: string
    /**
     *  // 唯一id、关键字，用来识别区分每个formitem
     */
    key: string
    /**
     *  // 表单的默认值 默认空的时候不写或者传undefind
     */
    defaultValue?: any
    /**
     *  // 数组中包含的字段就是显示的所在区域,不配置自动全选
     */
    mode?: ModeType[]
    /**
     *    // 表单的输入（不够用可自己按规范扩展
     */
    type: InputType
    /**
     *   // 表格宽度
     */
    width?: string
    /**
     *   // value 回调参数 item:配置，data:数据
     */
    format?: (value: any) => any
    /**
     *   //  value 回调参数 item:配置，data:数据
     */
    excelFormat?: (value: any) => any
    /**
     *   // 下拉，单选，多选 // 表格的时候用于格式化数据
     */
    options?: { label: string; value: any }[]
    /**
     *   // 用来传api地址
     */
    api?: string

    //   -----------------------------------------------表单配置 FromItem--------------------------------------------
    /**
     * 输入模式，下拉（单选可不传|多选multiple）
     */
    InputMode?: SelectMode | SwitchMode | DatePickerMode | TableInputMode

    /**
     *   是否显示 要和linkTo一起使用用于清空值
     */
    hide?: boolean
    /**
     *   // 联动，传需要被联动的key的值，主要用于改变值后清空数据
     */
    linkTo?: string | string[]
    /**
     *    // 是否禁用，默认false,ture:禁用
     */
    disabled?: boolean
    /**
     *    //  input number max
     */
    max?: number
    /**
     *   //  input number min
     */
    min?: number
    /**
     *   // 备注文字
     */
    placeholder?: string
    /**
     *   //  验证规则 （把独特的都存放在utils/rules里面）
     */
    rules?: {}[]
    /**
     *   // 转换成多个其他值,下拉返回使用
     */
    DataConvert?: Function
    /**
     *   // 具体查看官网antV inputNumber
     */
    parser?: Function

    //   -----------------------------------------------表格配置 TableItem--------------------------------------------

    /**
     *   // 默认隐藏表头
     */
    headerHide?: boolean
    /**
     *   // 启用排序
     */
    sorter?: boolean
    /**
     *   // 自定义td
     */
    customizeTD?: boolean
}
