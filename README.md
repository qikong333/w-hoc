# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

windicss中文文档链接：https://cn.windicss.org/

使用工作区的项目要引入antdv的样式 import 'ant-design-vue/dist/antd.css'

# 项目结构

├── App.vue     // 入口
├── assets
│   └── logo.png
├── components   //  公用组件
│   ├── SvgIcon     //  icon组件
│   │   ├── index.module.scss
│   │   └── index.tsx
│   ├── YwMenu      // 菜单组件
│   │   ├── data.ts
│   │   └── index.tsx
│   ├── demo        // 组件的例子文件
│   │   ├── index.scss
│   │   ├── index.tsx
│   │   ├── readme.md
│   │   ├── types
│   │   │   ├── input.ts
│   │   │   └── output.ts
│   │   └── useExample.tsx
│   ├── forms      //  表单组件，里面包括表单的所有元素，需要新的元素在这这里面进行封装
│   │   ├── YwCheckBox
│   │   │   └── index.tsx
│   │   ├── YwDatePicker
│   │   │   └── index.tsx
│   │   ├── YwForm
│   │   │   ├── datas.ts
│   │   │   ├── index.tsx
│   │   │   ├── inputElement.tsx
│   │   │   ├── types
│   │   │   │   ├── formIntput.d.ts
│   │   │   │   ├── formOutput.d.ts
│   │   │   │   └── inputType.ts
│   │   │   └── viewElement.tsx
│   │   ├── YwFormStep
│   │   │   ├── index.tsx
│   │   │   └── types
│   │   │       └── formStepInput.ts
│   │   ├── YwInput
│   │   │   └── index.tsx
│   │   ├── YwInputNumber
│   │   │   └── index.tsx
│   │   ├── YwRadio
│   │   │   └── index.tsx
│   │   ├── YwRangePicker
│   │   │   ├── format.ts
│   │   │   └── index.tsx
│   │   ├── YwSelect
│   │   │   ├── format.ts
│   │   │   └── index.tsx
│   │   ├── YwSwitch
│   │   │   ├── format.ts
│   │   │   └── index.tsx
│   │   ├── YwTableInput
│   │   │   ├── index.tsx
│   │   │   └── types
│   │   │       └── TableInput.ts
│   │   ├── YwTimePicker
│   │   │   └── index.tsx
│   │   ├── YwTreeSelect
│   │   │   └── index.tsx
│   │   ├── YwUpload
│   │   │   └── index.tsx
│   │   ├── form.dio
│   │   └── types
│   │       ├── formItem.d.ts
│   │       └── types.ts
│   ├── index.ts
│   ├── readme.md
│   ├── table     //  表格组件
│   │   └── YwTable
│   │       ├── index.scss
│   │       ├── index.tsx
│   │       ├── type.ts
│   │       └── types
│   │           ├── tableInput.ts
│   │           └── tableOutput.ts
│   └── tree   // 独立封装的树状组件
│       └── YwTree
│           ├── index.tsx
│           └── types
│               ├── treeInput.ts
│               └── treeOutput.ts
├── hoc  //  高阶组件
│   └── tablePage   //  表单页面组件（包括表格，增删改查所有表单功能）
│       └── YwTablePage
│           ├── apis.ts
│           ├── index.tsx
│           └── types
│               ├── action.ts
│               ├── tablePagInput\ .ts
│               └── tablePageOutput.ts
├── hook    // 抽象方法
│   ├── index.ts
│   ├── useHttp.ts
│   └── useapiType.ts
├── lang    // 国际化
│   ├── index.ts
│   ├── language.ts
│   └── readme.md
├── layout // 外框
│   ├── footer
│   │   └── index.tsx
│   ├── header
│   │   └── index.tsx
│   └── index.tsx
├── main.ts
├── router  // 路由
│   ├── baseRouter.ts
│   ├── cms.ts
│   ├── index.ts
│   └── md.md
├── shim.d.ts
├── source.d.ts
├── store   // 状态管理
│   ├── index.ts
│   ├── readme.md
│   └── state.ts
├── theme
│   ├── default.less
│   └── green.less
├── utils   // 平时用到的函数
│   ├── common
│   │   ├── debounce.ts
│   │   ├── getConfig.ts
│   │   ├── httpService.ts
│   │   └── mitt.ts
│   └── index.ts
└── view    // 页面
├── login
└── template
└── index.tsx

# 代码格式化

统一使用Prettier，插件地址：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode


# vue3 tsx的使用

https://juejin.cn/post/7151950058501373989
