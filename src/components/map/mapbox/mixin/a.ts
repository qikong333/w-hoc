import { onMounted } from 'vue'

const a = {
    setup() {
        onMounted(() => {
            console.log(99999)
        })

        console.log(1111)
    },
    mounted() {
        console.log(22222)
    },
}

export default a
