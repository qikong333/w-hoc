import { FormItem } from '@/components/forms/types/formItem'
import { apiType } from '@/components/forms/types/types'

export interface TableInput {
    api: {
        load?: apiType
        delete?: apiType
    }
    /**配置 */
    tableItems: FormItem[]
    /**加载 */
    loading: boolean
    /**数据 */
    tableData: any[]
    /**总数 */
    total: number
    /**设置ture 隐藏分页器 */
    noPage?: Boolean
    /**table组件的唯一id的key，用于分页多选 */
    rowKey?: string
    /**(表格内)隐藏操作按钮 */
    noOperation?: Boolean
    /**页面标题不传默认读取路由name,*/
    title?: string
}
