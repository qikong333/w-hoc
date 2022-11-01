import useHttp from '@/hook/useHttp'
import { message } from 'ant-design-vue'

export default useHttp({
    baseURL:
        import.meta.env.NODE_ENV === 'production'
            ? import.meta.env.VUE_APP_BASE_API
            : '/apis',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    reqValue: 'data',
    errorCode: {
        ture: 0,
        function(res: { code: number; message: string }) {
            switch (res.code) {
                case 0:
                    res.message && message.success(res.message)
                    break

                case 1:
                    res.message && message.error(res.message)
                    break

                default:
                    break
            }
        },
    },
})
