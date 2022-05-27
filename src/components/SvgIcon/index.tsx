import { defineComponent, reactive, watch, ref } from 'vue'
import './index.scss'
import { Tooltip } from 'ant-design-vue'

type iconType = 'normal' | 'reverse' | 'box' | 'circle'

interface Props {
    size: string
    name: string
    color: string
    bgColor: string
    type: iconType
    tooltip: string | null
    placement: string
}

export default defineComponent({
    name: 'SvgIcon',
    props: ['size', 'name', 'color', 'bgColor', 'type', 'tooltip', 'placement'],
    setup(props: Props, { emit }): () => void {
        let iconStyle: any = reactive({})
        // 图标大小
        const size = ref('16')
        // 图标名称 iconfont图库直接复制V3项目图标代码
        const name = ref('zhongzhimima')
        // icon颜色
        const color = ref('#fff')
        // icon背景色 仅在circle模式下生效
        const bgColor = ref('')
        // 图标类型
        const type = ref<iconType>('normal')
        // tooltip内容
        const tooltip = ref<string>('')
        // tooltip展示反向  具体参考antdv官网参数
        const placement = ref('top')

        const Html = reactive({
            node: () => (
                <span
                    style={[iconStyle, `fontSize:${size.value}px`]}
                    onMouseenter={() => enterIcon()}
                    onMouseleave={() => leaveIcon()}
                >
                    {tooltip && (
                        <Tooltip
                            placement={placement.value as any}
                            title={tooltip.value as any}
                        >
                            <svg class="svg-icon" aria-hidden="true">
                                <use xlinkHref={`#${name.value}`} />
                            </svg>
                        </Tooltip>
                    )}
                    {!tooltip && (
                        <svg class="svg-icon" aria-hidden="true">
                            <use xlinkHref={`#${name.value}`} />
                        </svg>
                    )}
                </span>
            ),
        })

        const enterIcon = (): void => {
            if (type.value === 'normal') return
            if (type.value === 'reverse') {
                iconStyle = {
                    color: '#0088FF',
                }
            } else if (type.value === 'box') {
                iconStyle = {
                    color: '#fff',
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '7px 13px',
                    border: ` 1px solid ${color.value}`,
                    background: color.value,
                }
            } else if (type.value === 'circle') {
                iconStyle = {
                    color: bgColor.value ? color.value : '#fff',
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '5px',
                    background: bgColor.value || color.value,
                    'border-radius': '50%',
                }
            }
        }

        const leaveIcon = (): void => {
            if (type.value === 'reverse' || type.value === 'normal') {
                iconStyle = {
                    color: color.value,
                }
            } else if (type.value === 'box') {
                iconStyle = {
                    color: color.value,
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '7px 13px',
                    border: ` 1px solid ${color.value}`,
                }
            } else if (type.value === 'circle') {
                iconStyle = {
                    color: bgColor.value ? color.value : '#fff',
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '5px',
                    background: bgColor.value || color.value,
                    'border-radius': '50%',
                }
            }
        }

        leaveIcon()
        watch(
            () => props,
            n => {
                size.value = n.size ?? size.value
                name.value = n.name ?? name.value
                color.value = n.color ?? color.value
                bgColor.value = n.bgColor ?? bgColor.value
                type.value = n.type ?? type.value
                tooltip.value = n.tooltip ?? tooltip.value
                placement.value = n.placement ?? placement.value
                // console.log(n)
                // console.log(name)
            },
            { deep: true, immediate: true }
        )
        watch(
            () => color,
            (curAge, preAge) => {
                leaveIcon()
            },
            { deep: true, immediate: true }
        )

        return () => <>{Html.node()}</>
    },
})
