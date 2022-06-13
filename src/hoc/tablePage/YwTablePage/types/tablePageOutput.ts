export interface TablePageOutput {
    /**
     * 设置表格加载状态
     * @param v Boolean
     */
    setLoad: (v: boolean) => void

    /**
     * 页码参数
     * @param pageSize 条数
     * @param pageIndex 页码
     */
    getPage: () => {
        pageSize: number
        pageIndex: number
    }
}
