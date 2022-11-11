import { defineComponent, reactive, watchEffect, watch } from 'vue'
import { Button, Upload } from 'ant-design-vue'
import { FormItem } from '../types/formItem'
import s from './index.module.scss'
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
            fileList: [],
            handleChange() {},
        })

        // 监听赋值
        watchEffect(() => (Ctl._value = props.value ?? []))
        return () => (
            <>
                <Upload
                    name="avatar"
                    v-model:file-list={Ctl.fileList}
                    action={import.meta.env.VITE_APP_UPLOAD_URL}
                    headers={Ctl.headers}
                    show-upload-list={false}
                    onChange={() => Ctl.handleChange()}
                    class={s['avatar-uploader']}
                >
                    <div class={s['ant-upload-text']}>Upload</div>
                </Upload>
            </>
        )
    },
})

export default YwUpload
