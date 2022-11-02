import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            language: 'en-US',
        }
    },
    getters: {},
    actions: {},
})
