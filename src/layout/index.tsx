import { defineComponent } from 'vue'
import Footer from './footer'
import Header from './header'
import bg from '@/assets/texture.png'
import YwMenu from '@/components/YwMenu'
export default defineComponent({
    setup(props, { emit, expose }): () => JSX.Element {
        const style = {
            backgroundImage: `url(${bg})`,
            backgroundColor: '#fff',
        }
        const style2 = {
            backgroundColor: '#001528',
        }
        return () => (
            <>
                <div class="flex">
                    <div class="basis-200px h-100vh " style={style2}>
                        <YwMenu />
                    </div>
                    <div
                        style={style}
                        class="flex-auto h-100vh overflow-y-auto overflow-x-hidden p-20px"
                    >
                        3213132
                    </div>
                </div>
            </>
        )
    },
})
