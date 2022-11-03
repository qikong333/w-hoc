interface Language {
    [key: string]: {
        cn: string
        en: string
    }
}

const language: Language = {
    xx: {
        cn: '展开高级筛选',
        en: 'Expand Advanced Screening',
    },
    add: {
        cn: '添加',
        en: 'add',
    },
    total: {
        cn: '共 {m} 条',
        en: '{m}',
    },
    pageSice: {
        cn: '{m} 条/页',
        en: '{m} / page',
    },
}

export default language
