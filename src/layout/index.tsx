import { defineComponent } from 'vue'
import Footer from './footer'
import Header from './header'

export default defineComponent({
    setup(props, { emit, expose }): () => JSX.Element {
        return () => (
            <>
                <Header />
                <a-row>
                    <a-col span={6}>1231321</a-col>
                    <a-col span={18}>
                        <router-view />
                    </a-col>
                </a-row>

                <Footer />
            </>
        )
    },
})
