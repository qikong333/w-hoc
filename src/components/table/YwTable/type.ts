import { apiType } from '@/components/forms/types/types'
import { FormItem } from '@/components/forms/types/formItem'

export interface TableConfig extends TablePageTableConfig {
    /**api接口方法 */
    api: {
        load?: apiType
        delete?: apiType
    }
    /**表格配置 */
    tableItems: FormItem[]
    /**加载状态 */
    loading: boolean
    /**表格数据 */
    tableData: any[]
    /**表格数据条数 */
    total: number
}

export interface TablePageTableConfig {
    /**设置ture 隐藏分页器 */
    noPage?: Boolean
    /**table组件的唯一id的key，用于分页多选 */
    rowKey?: string
    /**(表格内)隐藏操作按钮 */
    noOperation?: Boolean
    /**页面标题不传默认读取路由name,*/
    title?: string
}
