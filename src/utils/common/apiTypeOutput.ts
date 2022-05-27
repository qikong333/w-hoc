import { apiType } from '@/components/forms/types/types'

const apitypeOutput = (api: apiType): apiType => {
    console.log(typeof api)
    let res = null
    switch (typeof api) {
        case 'string':
            // 考虑post和get
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

export default apitypeOutput
