import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    ref,
    watch,
    watchEffect,
} from 'vue'
import { FormItem, ModeType } from '../types/formItem'
import { FormItems, formData } from './datas'
import { Form } from 'ant-design-vue'

import { useForm } from 'ant-design-vue/lib/form'
import inputElement from './inputElement'
import viewElement from './viewElement'
import { FormInput } from './types/formIntput'
import { FormOutput } from './types/formOutput'

const YwForm = defineComponent({
    emits: ['update:formData', 'change'],
    props: ['formItems', 'mode', 'formData', 'config'],
    setup(props: FormInput, { emit, expose }): () => JSX.Element {
        const FormItemNode = Form.Item

        const Ctl = reactive({
            form: {} as any,
            useFormCtl: {},
        })

        const formRef = ref()

        // 初始化item配置
        const config = computed(() => {
            const modes: ModeType[] = [
                'view',
                'edit',
                'add',
                'table',
                'search',
                'excel',
            ]
            return (props.formItems ?? FormItems).map(r => {
                !r.mode && (r.mode = modes)
                return r
            })
        })

        const Funcs = reactive({
            formChange(item: FormItem) {},
        })

        const initForm = () => {
            config.value.forEach(r => {
                Ctl.form[r.key] = r.defaultValue ? r.defaultValue : undefined
            })
        }

        const rulesRef = computed(() => {
            const obj = {} as any
            config.value.map(r => {
                obj[r.key] = r.rules
            })
            return obj
        })

        onMounted(() => {
            initForm()
        })

        const setForm = (data: {}) => {
            Ctl.form = { ...data }
        }

        // type F = keyof typeof Ctl.form

        // const { resetFields, validate, validateInfos, clearValidate } = useForm(
        //     Ctl.form,
        //     rulesRef
        // )

        expose({
            resetForm() {
                Ctl.form = {}
                initForm()
            },
            setForm,
            getForm() {
                return Ctl.form
            },
            validate() {
                return formRef.value.validate()
            },
        } as FormOutput)
        const onSubmit = async () => {
            console.log(Ctl.form)

            await formRef.value.validate()
            formRef.value.getForm()
        }

        // 判断item类型
        const element = (formItem: FormItem) => {
            if (formItem.mode?.includes(props.mode ?? 'add')) {
                return (
                    <FormItemNode label={formItem.label} name={formItem.key}>
                        {props.mode === 'view'
                            ? viewElement(formItem, Ctl.form)
                            : inputElement(formItem, Ctl.form, emit)}
                    </FormItemNode>
                )
            }
        }

        // 设置值
        watchEffect(() => setForm(props.formData ?? {}))
        // watch(
        //     () => props.formData,
        //     () => {
        //         setForm(props.formData)
        //     },
        //     { deep: true }
        // )

        return () => (
            <>
                {JSON.stringify(Ctl.form)}
                <Form
                    layout={props.config?.layout}
                    model={Ctl.form}
                    ref={formRef}
                    label-col={{ span: props.config?.labelCol ?? 4 }}
                    wrapper-col={{ span: props.config?.wrapperRol ?? 14 }}
                    rules={rulesRef.value}
                >
                    {config.value.map(data => element(data))}
                </Form>

                {/* <button onClick={onSubmit}>提交</button> */}
            </>
        )
    },
})

export default YwForm
