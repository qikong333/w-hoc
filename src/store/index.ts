import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            threejs: {
                name: 434,
            },
        }
    },
    getters: {},
    actions: {},
})
