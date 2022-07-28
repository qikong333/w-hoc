import { defineComponent, reactive, ref, onMounted } from 'vue'

export default defineComponent({
    emits: ['change'],
    setup(props, { emit }) {
        const imgList = [
            'https://staging.knitup.io/stripe/static/image/pattern/1.jpg',
            'https://staging.knitup.io/stripe/static/image/pattern/2.jpg',
            'https://staging.knitup.io/stripe/static/image/pattern/3.jpg',
            'https://staging.knitup.io/stripe/static/image/pattern/4.jpg',
            'https://staging.knitup.io/stripe/static/image/pattern/5.jpg',
        ]

        function select(color: string) {
            emit('change', color)
        }

        return () => (
            <>
                <div class="flex">
                    {imgList.map(r => (
                        <img onClick={() => select(r)} src={r} />
                    ))}
                </div>
            </>
        )
    },
})
