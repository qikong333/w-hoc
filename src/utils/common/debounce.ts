// 工具函数
const delayDefault = 500

// 防抖
export const debounce = (delay = delayDefault) => {
    return function (target, key, descriptor) {
        const oldValue = descriptor.value
        let timer: any = null
        descriptor.value = function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
                oldValue.apply(this, arguments)
            }, delay)
        }
        return descriptor
    }
}

// 节流 时间戳写法
export const throttle = (delay = delayDefault) => {
    return function (target, key, descriptor) {
        let lastTime, timer
        const oldFunction = descriptor.value
        descriptor.value = function () {
            let nowTime = +new Date()
            if (lastTime && nowTime - lastTime < delay) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    oldFunction.apply(this, arguments)
                    lastTime = nowTime
                }, delay)
            } else {
                oldFunction.apply(this, arguments)
                lastTime = nowTime
            }
        }
        return descriptor
    }
}

// 节流  定时器写法
export const throttle = (delay = delayDefault) => {
    return function (target, key, descriptor) {
        let timer: any = null
        const oldFunction = descriptor.value
        descriptor.value = function () {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null
                    oldFunction.apply(this, arguments)
                }, delay)
            }
        }
        return descriptor
    }
}
