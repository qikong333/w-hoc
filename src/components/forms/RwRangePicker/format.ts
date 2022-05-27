export function viewRangePicker(value: Array<string>) {
    if (value && value.length === 2) {
        return `${value[0]} ~ ${value[1]}`
    } else return null
}
