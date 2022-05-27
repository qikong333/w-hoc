export function viewMutiOption(
    item: any,
    value: Array<string | number> | number | string
) {
    if (value instanceof Array) {
        const arr: any = []
        item.forEach((option: any) => {
            value.forEach(i => {
                if (i === option.value) {
                    arr.push(option)
                }
            })
        })
        return arr.length === 0 ? null : arr.map((r: any) => r.label).toString()
    } else {
        const obj = item ? item.find((r: any) => r.value === value) : null
        return obj ? obj.label : null
    }
}
