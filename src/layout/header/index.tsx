import { defineComponent } from 'vue'

export default defineComponent({
    setup(props, { emit, expose }): () => JSX.Element {
        return () => <>header</>
    },
})
