//组件 props的类型
export interface XxxInput {
    /** 说明操作作用 */
    a: number

    /**
     * 方法用来干嘛的说明
     * @param {string}v 参数用来干嘛的
     *
     */
    b: (v: string) => void
}
