import YwInput from '../YwInput'
import YwSelect from '../YwSelect'
import YwRadio from '../YwRadio'
import YwCheckBox from '../YwCheckBox'
import YwSwitch from '../YwSwitch'
import YwDatePicker from '../YwDatePicker'
import YwRangePicker from '../YwRangePicker'
import YwTimePicker from '../YwTimePicker'
import YwInputNumber from '../YwInputNumber'
import { FormItem } from '../types/formItem'
import { InputType } from './types/inputType'
import YwMapPoint from '../YwMapPoint'
import MapRange from '../YwMapRange'
import YwTableInput from '../YwTableInput/index'
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
                    <YwInput {...attr} v-model:value={form[formItem.key]} />
                </>
            )
            break
        case InputType.Select:
            el = (
                <YwSelect
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.InputNumber:
            el = (
                <YwInputNumber
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Radio:
            el = (
                <YwRadio
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Checkbox:
            el = (
                <YwCheckBox
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.Switch:
            el = (
                <YwSwitch
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.DatePicker:
            el = (
                <YwDatePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.RangePicker:
            el = (
                <YwRangePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break
        case InputType.TimePicker:
            el = (
                <YwTimePicker
                    item={formItem}
                    v-model:value={form[formItem.key]}
                    onChange={() => changForm(formItem, form, emit)}
                />
            )
            break

        case InputType.MapPoint:
            el = (
                <FormItemRestNode>
                    <YwMapPoint
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
                    <YwTableInput
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
