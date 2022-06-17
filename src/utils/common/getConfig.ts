function getConfig(): { [key: string]: any } {
    const json = import.meta.globEager('~/y-hoc.config.json')
    const key = Object.keys(json)[0]
    return json[key]
}

export default getConfig
