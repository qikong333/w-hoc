import { Steps, Button } from 'ant-design-vue'
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import YwForm from '../YwForm'
import { FormStepInput } from './types/formStepInput'

const YwFormStep = defineComponent({
    name: 'YwFormStep',
    emits: ['handleCancel'],
    props: ['formItems', 'mode', 'steps', 'api'],
    setup(props: FormStepInput, { emit, expose }): () => JSX.Element {
        const Ctl = reactive({
            current: 0,
            forms: [] as {}[],
            _steps: ['First', 'Second', 'Last'],
        })

        const formRef = ref<any>(null)

        Ctl.forms = new Array(Ctl._steps.length).fill({})

        const handleCancel = () => {
            emit('handleCancel')
        }
        const prev = () => {
            Ctl.current -= 1
        }

        const next = async () => {
            await formRef.value.validate()
            Ctl.current += 1
        }
        const done = async () => {
            await formRef.value.validate()

            return props.api(Ctl.forms)
        }

        const Step = Steps.Step

        expose({
            current: () => Ctl.current,
            forms: () => Ctl.forms,
        })

        watchEffect(() => {
            props.steps && (Ctl._steps = props.steps)
        })

        return () => (
            <>
                {JSON.stringify(Ctl.forms)}
                <Steps labelPlacement="vertical" v-model:current={Ctl.current}>
                    {Ctl._steps.map(item => (
                        <Step key={item} title={item} />
                    ))}
                </Steps>

                <YwForm
                    mode={props.mode ?? 'add'}
                    formItems={props.formItems[Ctl.current]}
                    v-model:formData={Ctl.forms[Ctl.current]}
                    // formData={Ctl.forms[Ctl.current]}
                    // onChange={e => (Ctl.forms[Ctl.current] = e)}
                    ref={formRef}
                />

                <Button onClick={handleCancel}>取消</Button>
                {Ctl.current > 0 && <Button onClick={prev}>上一步</Button>}
                {Ctl.current < Ctl._steps.length - 1 && (
                    <Button onClick={next}>下一步</Button>
                )}
                {Ctl.current === Ctl._steps.length - 1 && (
                    <Button onClick={done}>提交</Button>
                )}
            </>
        )
    },
})

export default YwFormStep
