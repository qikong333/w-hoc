import { FormItem, ModeType } from '../../types/formItem'

export interface FormInput {
    /**表格配置 */
    formItems?: FormItem[]
    /**表格模式 */
    mode?: ModeType
    /**表格数据 */
    formData?: {}
    /**表格样式配置 */
    config?: {
        /**lable 的占位 24 */
        labelCol: number
        /**输入框 的占位 24 */
        wrapperRol: number
        /**表单布局 */
        layout: 'horizontal' | 'vertical' | 'inline'
    }
}
