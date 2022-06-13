import { FormItem, ModeType } from '../../types/formItem'

export interface FormInput {
    /**表格配置 */
    formItems: FormItem[]
    /**表格模式 */
    mode: ModeType
    /**表格数据 */
    formData: {}
}
