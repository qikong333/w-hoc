import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import antdZhCNLocale from 'ant-design-vue/lib/locale-provider/zh_CN'
import antdEnLocale from 'ant-design-vue/lib/locale-provider/en_GB'
import { createI18n } from 'vue-i18n'
import language from './language'

const zh_CN: { [key: string]: string } = {}
const en: { [key: string]: string } = {}
Object.keys(language).forEach((key: string) => {
    zh_CN[key] = language[key].cn
    en[key] = language[key].en
})

const messages = {
    'en-US': {
        ...antdEnLocale,
        ...en,
    },
    'zh-CN': {
        ...antdZhCNLocale,
        ...zh_CN,
    },
}

const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN', // set locale
    messages, // set locale message
    allowComposition: true, // you need to specify that!
})

export default i18n
