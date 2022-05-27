import { TreeDataItem } from 'ant-design-vue/lib/tree/Tree'

export interface TreeInput {
    /**输入值绑定，用于双向绑定 */
    value: any
    /**是否选择 */
    checkable: boolean
    /**书数据 */
    treeData: TreeDataItem[]
    /**加载事件 */
    loadData: Function
}
