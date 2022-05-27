export interface PathNavigatorOutput {
    /**
     * 开始
     * @param speed 速度
     */
    start: (speed: number) => void
    /** 暂停 */
    pause: Function
    /** 返回当前位置的经纬度 */
    getPosition: Function
    /** 恢复 */
    resume: Function
    /** 停止 */
    stop: Function
    /** 销毁 */
    destroy: Function
}
