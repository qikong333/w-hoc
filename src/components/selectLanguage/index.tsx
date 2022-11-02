import { defineComponent, reactive, ref } from 'vue'
import { Select } from 'ant-design-vue'
import i18n from '../../i18n/index'
import { useI18n } from 'vue-i18n'
import { mainStore } from '@/store'

export default defineComponent({
    setup() {
        const { locale } = useI18n()
        // 固定使用Ctl，内部响应式变量
        const Ctl = reactive({
            value: localStorage.getItem('lang'),
            change(v: any) {
                locale.value = v
                localStorage.setItem('lang', v)
                mainStore().language = v
            },
            options: [
                {
                    label: '简体中文',
                    value: 'zh-CN',
                },
                {
                    label: 'English',
                    value: 'en-US',
                },
            ],
        })

        // 返回html部分
        return () => (
            <Select
                style={{ width: '200px' }}
                v-model:value={Ctl.value}
                optionFilterProp="label"
                // placeholder={props.item?.placeholder}
                options={Ctl.options}
                onChange={Ctl.change}
            />
        )
    },
})
