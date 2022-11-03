import i18n from '@/i18n'
export default function (key: string, m?: any) {
    return i18n.global.t(key, { m })
}
