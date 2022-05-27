import { watch } from 'vue'
const point = (map: any, props: any) => {
    console.log(props.points)
    map.setCenter(props.points)

    watch(
        () => props.points,
        () => {
            console.log(11111111111111111)
            map.setCenter(props.points)
        },
        {
            deep: true,
        }
    )
}

export default point
