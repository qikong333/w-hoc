使用方法：

1、在.vue里面使用

```
{{$t('xxx')}}
```

2、在.tsx里面使用

```
import i18n from '@/i18n'

{i18n.global.t('xx')}
```

3、如何添加新的语言

* 在 `./antdvLang.ts` 添加UI库的语言代码，语言编码在以下地址找到 `https://antdv.com/docs/vue/i18n-cn`
* 在 `./language.ts` 添加对应语言，在 `./index.ts `添加对应的key
