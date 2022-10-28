import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import antdZhCNLocale from 'ant-design-vue/lib/locale-provider/zh_CN'
import antdEnLocale from 'ant-design-vue/lib/locale-provider/en_GB'
import { createI18n } from 'vue-i18n'
import lang from './lang' 
 

const zh_CN = {}
const en = {}
Object.keys(lang).forEach(key => {
  zh_CN[key] = lang[key].cn
  en[key] = lang[key].en
})
 
  

const messages = {
  en: {
    ...antdEnLocale,
    ...en
  },
  'zh-CN': {
    ...antdZhCNLocale,
    ...zh_CN
  },
  
 
}

const i18n = new createI18n({
  fallbackLocale:  'zh-CN', // set locale
  messages, // set locale message
  silentTranslationWarn: true
})

Vue.use(i18n)

export default i18n
