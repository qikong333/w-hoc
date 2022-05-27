import { defineComponent, reactive, ref } from 'vue'

import './index.scss'
import { Button } from 'ant-design-vue'
import RwAmap from '@/components/map/amap'
import { MapOutput } from '@/components/map/amap/types/output'

export default defineComponent({
    setup(props) {
        const Ctl = reactive({
            pointList: [
                {
                    lable: '消防点1',
                    value: [113.448201, 23.249804],
                },
                {
                    lable: '消防点2',
                    value: [113.49867, 23.197115],
                },
                {
                    lable: '消防点3',
                    value: [113.486997, 23.152928],
                },
                {
                    lable: '消防点4',
                    value: [113.572141, 23.235293],
                },
                {
                    lable: '消防点5',
                    value: [113.628102, 23.198061],
                },
            ],
            value: null,
            btnClick(v: any) {
                Ctl.value = v
            },
            handleStart: () => {
                RwAmapRef.value?.pathNavigator?.start(5000)
            },
            handlePause: () => {
                RwAmapRef.value?.pathNavigator?.pause()
            },
            handleResume: () => {
                RwAmapRef.value?.pathNavigator?.resume()
            },

            handleData: () => {
                console.log(111)

                pathNavigaParams.list = [
                    [116.354149, 39.898094],
                    [116.352913, 39.898006],
                    [116.35038, 39.897816],
                    [116.350136, 39.8978],
                    [116.349876, 39.897789],
                    [116.349632, 39.897781],
                ]
            },
        })
        const RwAmapRef = ref<MapOutput>()
        const drivingParams = {
            startLngLat: [116.369962, 39.880255],
            endLngLat: [116.341123, 39.985033],
            // waypoints: [
            //     [116.999999, 39.585033],
            //     [116.123456, 39.123456],
            // ],
        }
        let pathNavigaParams = reactive({
            list: [
                [116.405289, 39.904987],
                [116.406265, 39.905015],
                [116.3918, 39.900387],
                [116.390381, 39.900356],
                [116.389412, 39.900326],
                [116.388039, 39.900288],
                [116.367584, 39.899612],
                [116.366348, 39.899574],
                [116.36554, 39.899548],
                [116.365135, 39.89954],
                [116.364464, 39.899509],
            ],
            config: {
                pathColor: 'red',
                markerImg:
                    'https://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
            },
        })

        return () => (
            <>
                <div class="wapper">
                    <div>
                        <RwAmap
                            ref={RwAmapRef}
                            // driving={drivingParams}
                            pathNavigator={pathNavigaParams}
                        />
                        <Button onClick={Ctl.handleStart}>开始</Button>
                        <Button onClick={Ctl.handlePause}>暂停</Button>
                        <Button onClick={Ctl.handleResume}>恢复</Button>
                        <Button onClick={Ctl.handleData}>改数据</Button>
                    </div>
                    <div class="pointList">
                        {Ctl.pointList.map((e: any) => (
                            <Button onClick={() => Ctl.btnClick(e.value)}>
                                {e.lable}
                            </Button>
                        ))}
                    </div>
                </div>
            </>
        )
    },
})
