import httpService from '@/utils/common/httpService'
import { inputApis } from './types/tablePagInput '

export function useApis(apis: inputApis, p: any) {
    const add =
        typeof apis.add === 'string' ? httpService.post(apis.add, p) : apis.add
    const load =
        typeof apis.load === 'string'
            ? httpService.get(apis.load, p)
            : apis.load
    const edit =
        typeof apis.edit === 'string'
            ? httpService.post(apis.edit, p)
            : apis.edit
    const del =
        typeof apis.delete === 'string'
            ? httpService.post(apis.delete, p)
            : apis.delete
    const exportExcel =
        typeof apis.exportExcel === 'string'
            ? httpService.post(apis.exportExcel, p)
            : apis.exportExcel

    return {
        add,
        load,
        edit,
        del,
        exportExcel,
    }
}
