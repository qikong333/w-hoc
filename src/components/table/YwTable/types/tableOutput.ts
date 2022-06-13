export interface TableOutput {
    /**分页参数 */
    getPage: () => {
        pageSize: number
        pageIndex: number
    }
    /**多选选中行的key */
    selectRows: () => any[]
    /**重置Page */
    resetPage: () => void
}
