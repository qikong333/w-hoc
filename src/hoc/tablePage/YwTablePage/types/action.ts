const enum ActionType {
    /**查看 */
    view = 'view',
    /**编辑 */
    edit = 'edit',
    /**添加 */
    add = 'add',
    /**搜索 */
    search = 'search',
    /**删除 */
    delete = 'delete',
    /**导出 */
    export = 'export',
    /**刷新 */
    refresh = 'refresh',
    /**批量导出 */
    batchExport = 'batchExport',
    /**批量删除 */
    batchDelete = 'batchDelete',
}

export default ActionType
