<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import antdvLang from './i18n/antdvLang'
import { mainStore } from './store'
dayjs.locale('zh-cn')
const locale = computed(() => antdvLang[mainStore().language])
//
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<style leng="scss">
/* #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e67a1b;
  margin-top: 60px;
} */
</style>
