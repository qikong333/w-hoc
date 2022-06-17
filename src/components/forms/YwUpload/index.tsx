import { defineComponent, reactive, watchEffect, watch } from 'vue'
import { Button, Upload } from 'ant-design-vue'
import { FormItem } from '../types/formItem'

interface Props {
    value: string
    item: FormItem
}

const YwUpload = defineComponent({
    emits: ['update:value', 'change'], // 必须写双向绑定
    props: ['value', 'item'],
    setup(props: Props, { emit }): () => JSX.Element {
        // 固定使用Ctl
        const Ctl = reactive({
            _value: '', // 双向绑定的值尽量使用组件内部的
            indeterminate: true,
            checkAll: false,
            headers: {
                authorization: 'authorization-text',
            },
            fileList: '',
            handleChange() {},
        })

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value ?? []))
        return () => (
            <>
                11
                {/* <Upload
                    v-model:file-list={Ctl.fileList}
                    name="file"
                    action={import.meta.env.VITE_APP_UPLOAD_URL}
                    headers={Ctl.headers}
                    onChange={() => Ctl.handleChange()}
                >
                    <Button>Click to Upload</Button>
                </Upload> */}
            </>
        )
    },
})

export default YwUpload
