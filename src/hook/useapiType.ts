import { apiType } from '@/components/forms/types/types'

interface Params {
    api: apiType
    type?: 'get' | 'post'
    reques?: Function
}

const useApiType = ({ api, type, reques }: Params): apiType => {
    console.log(typeof api)
    let res = null
    switch (typeof api) {
        case 'string':
            break

        case 'undefined':
            res = null
            break

        default:
            res = api
            break
    }
    return res
}

export default useApiType
