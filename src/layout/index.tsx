import { defineComponent } from 'vue'
import Footer from './footer'
import Header from './header'

export default defineComponent({
    setup(props, { emit, expose }): () => JSX.Element {
        return () => (
            <>
                <Header />
                <router-view />
                <Footer />
            </>
        )
    },
})
