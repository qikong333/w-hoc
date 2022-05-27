import RwInput from '../RwInput'
import RwSelect from '../RwSelect'
import RwRadio from '../RwRadio'
import RwCheckBox from '../RwCheckBox'
import RwSwitch from '../RwSwitch'
import RwDatePicker from '../RwDatePicker'
import RwRangePicker from '../RwRangePicker'
import RwTimePicker from '../RwTimePicker'
import RwInputNumber from '../RwInputNumber'
import { FormItem } from '../types/formItem'
import { InputType } from './types/inputType'
import RwMapPoint from '../RwMapPoint'
import MapRange from '../RwMapRange'
import RwTableInput from '../RwTableInput/index'
import { Form } from 'ant-design-vue'

/**控制表单改变的总方法 */
const changForm = (formItem: FormItem, form: any, emit: Function) => {
    // console.log(form)
    // 联动控制清空值
    if (formItem.linkTo) {
        if (typeof formItem.linkTo === 'string') {
            form[formItem.linkTo] = undefined
        }
        if (formItem.linkTo instanceof Array) {
            form[formItem.linkTo.toString()].forEach((e: string) => {
                form[e] = undefined
            })
        }
    }

    // 抛出chang事件
    emit('update:formData', form)
    emit('change', form)
}

const FormItemRestNode = Form.ItemRest

const inputElement = (formItem: FormItem, form: any, emit: Function) => {
    let el = null

    const attr = {
        item: formItem,
        onChange: () => changForm(formItem, form, emit),
    }

    switch (formItem.type) {
        case InputType.Input:
            el = (
                <>
                    <RwInput {...attr} v-model:value={form[formItem.key]} />
                </>
            )
            break
        case InputType.Select:
            el = (
                <RwSelect
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.InputNumber:
            el = (
                <RwInputNumber
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Radio:
            el = (
                <RwRadio
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Checkbox:
            el = (
                <RwCheckBox
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Switch:
            el = (
                <RwSwitch
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.DatePicker:
            el = (
                <RwDatePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.RangePicker:
            el = (
                <RwRangePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.TimePicker:
            el = (
                <RwTimePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break

        case InputType.MapPoint:
            el = (
                <FormItemRestNode>
                    <RwMapPoint
                        item={formItem}
                        v-model:value={form[formItem.key]}
                        onChange={() => changForm(formItem, form, emit)}
                    />
                </FormItemRestNode>
            )
            break

        case InputType.MapRange:
            el = (
                <MapRange
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break

        case InputType.TableInput:
            el = (
                <FormItemRestNode>
                    <RwTableInput
                        item={formItem}
                        v-model:value={form[formItem.key]}
                        onChange={() => changForm(formItem, form, emit)}
                    />
                </FormItemRestNode>
            )
            break

        default:
            break
    }

    return el
}

export default inputElement
