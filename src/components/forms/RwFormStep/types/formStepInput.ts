import { FormItem } from '../../types/formItem'
import { apiType } from '../../types/types'

export interface FormStepInput {
    formItems: FormItem[][]
    steps: string[]
    api: apiType
    mode: string
}
