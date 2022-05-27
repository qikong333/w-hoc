import { Tree } from 'ant-design-vue'
import { TreeDataItem } from 'ant-design-vue/lib/tree/Tree'
import { defineComponent, reactive } from 'vue'
import { TreeInput } from './types/treeInput'

const eg: TreeDataItem[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    { title: 'leaf', key: '0-0-0-0' },
                    { title: 'leaf', key: '0-0-0-1' },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
            },
        ],
    },
]
export default defineComponent({
    name: 'RwTree',
    props: ['checkable', 'treeData', 'loadData', 'value'],
    setup(props: TreeInput, { emit }): () => JSX.Element {
        const Ctl = reactive({
            _value: undefined,
            expandedKeys: [],
            selectedKeys: [],
            checkedKeys: [],
        })

        const onLoadData = (treeNode: any): Promise<any> => {
            return new Promise(() => {})
        }

        return () => (
            <>
                <Tree
                    load-data={props.loadData && onLoadData}
                    checkable={props.checkable}
                    tree-data={props.treeData ?? eg}
                    v-model:expandedKeys={Ctl.expandedKeys}
                    v-model:selectedKeys={Ctl.selectedKeys}
                    v-model:checkedKeys={Ctl.checkedKeys}
                ></Tree>
            </>
        )
    },
})
