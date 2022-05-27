export interface FormOutput {
    /**
     * 验证通过直接返回form的值赋值
     * 前面记得要用await不然拦截无效
     * await validate()
     * */
    validate: () => void
    /**清空验证 */
    cearValidate: () => void
    /**清空表单 */
    resetForm: () => void
    /**
     * 设置值
     * data 传object用来合并
     */
    setForm: (data: {}) => void
    /**获取表单form值 */
    getForm: () => void

    validateInfos?: {}
}
