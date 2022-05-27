import { FormItem } from '@/components/forms/types/formItem'
import { apiType } from '@/components/forms/types/types'
import { TableInput } from '@/components/table/RwTable/types/tableInput'

export interface TablePageIutput {
    /***表格和表单的配置项*/
    config: FormItem[]
    /**顶部菜单 */
    topTools?: {
        add?: apiType
        load?: apiType
        exportExcel?: apiType
        search?: apiType
        delete?: apiType
    }
    /**表单配置 */
    form: {}
    /**表格配置 */
    table?: TableInput
    api: {
        search?: apiType
        load?: apiType
        add?: apiType
        edit?: apiType
        delete?: apiType
        view?: apiType
        exportExcel?: apiType
        batchDeletion?: apiType
    }
}
