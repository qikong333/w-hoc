import { Menu, SubMenu } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'
import routerData from './data'

interface MenuItemType {
    path: string
    name: string
    meta: {
        icon: string
        title: string
    }
    children: MenuItemType[]
}

export default defineComponent({
    props: ['routerData'],
    setup(props, { emit, expose }): () => JSX.Element {
        const MenuItem = Menu.Item
        const SubMenu = Menu.SubMenu

        const state = reactive({
            collapsed: false,
            selectedKeys: ['1'],
            openKeys: ['sub1'],
            preOpenKeys: ['sub1'],
            isDown2(item: MenuItemType) {
                const menuItem = (item: MenuItemType) => (
                    <MenuItem key={item.name}> {item.meta.title} </MenuItem>
                )

                const subMenu = (item: MenuItemType) => (
                    <SubMenu
                        key={item.name}
                        v-slots={{
                            title: () => item.meta.title,
                        }}
                    >
                        {item.children.map(child => (
                            <MenuItem key={child.name}>
                                {child.meta.title}
                            </MenuItem>
                        ))}
                    </SubMenu>
                )
            },
            isDown(item: MenuItemType) {
                let el = <></>
                if (item.children) {
                    // 子菜单为1个的时候
                    if (item.children.length === 1) {
                        el = (
                            <MenuItem key={item.name}>
                                {item.meta.title}
                            </MenuItem>
                        )
                    } else {
                        // 子菜单为多个的时候
                        el = (
                            <SubMenu
                                key={item.name}
                                v-slots={{
                                    title: () => item.meta.title,
                                }}
                            >
                                {item.children.map(child => {
                                    ;<MenuItem key={child.name}>
                                        {child.meta.title}
                                    </MenuItem>
                                })}
                            </SubMenu>
                        )
                    }
                } else {
                    // 无子菜单
                    el = <MenuItem key={item.name}>{item.meta.title}</MenuItem>
                }

                return el
            },
        })

        return () => (
            <>
                <Menu mode="inline" inline-collapsed={state.collapsed}>
                    {(props.routerData || routerData).map(
                        (item: MenuItemType) => {
                            return state.isDown(item)
                        }
                    )}
                </Menu>
            </>
        )
    },
})
