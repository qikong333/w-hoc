import YwInput from '../YwInput'
import { FormItem } from '../types/formItem'
import { InputType } from './types/inputType'
import { viewMutiOption } from '../YwSelect/format'
import { viewSwitch } from '../YwSwitch/format'
import { viewRangePicker } from '../YwRangePicker/format'

const viewElement = (formItem: FormItem, form: any) => {
    let value = null

    switch (formItem.type) {
        case InputType.Input:
        case InputType.InputNumber:
        case InputType.DatePicker:
        case InputType.TimePicker:
            value = form[formItem.key]
            break
        case InputType.Select:
        case InputType.Radio:
        case InputType.Checkbox:
            value = viewMutiOption(formItem.options, form[formItem.key])
            break
        case InputType.Switch:
            value = viewSwitch(formItem.InputMode, form[formItem.key])
            break

        case InputType.RangePicker:
            value = viewRangePicker(form[formItem.key])
            break

        default:
            break
    }

    const formatElement = (
        <span style={formItem.style}>
            {formItem.format ? formItem.format(value) : value}
        </span>
    )

    return formItem.innerHtml
        ? formItem.innerHtml(value, formItem)
        : formatElement
}

export default viewElement
