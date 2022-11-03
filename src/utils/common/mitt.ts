import mitt from 'mitt'

interface Bus {
    $on: any
    $off: any
    $emit: any
}

const bus: Bus = {
    $on: null,
    $off: null,
    $emit: null,
}
const emitter = mitt()

bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export default bus

// 组件之间的数据交互
