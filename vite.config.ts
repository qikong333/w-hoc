import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import { VitePWA } from 'vite-plugin-pwa'
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'
import path from 'path'
// const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: {},
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        vue(),
        themePreprocessorPlugin({
            less: {
                multipleScopeVars: [
                    {
                        scopeName: 'theme-defalult',
                        path: path.resolve('src/theme/default.less'),
                    },
                    {
                        scopeName: 'theme-green',
                        path: path.resolve('src/theme/green.less'),
                    },
                ],
            },
        }),
        WindiCSS(),
        vueJsx({}),
        // // add PWA
        // VitePWA({
        //   manifest: {},
        //   workbox: {
        //     skipWaiting: true,
        //     clientsClaim: true,
        //   },
        // }),

        // 按需加载antd组件
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
        // 加载antd组件样式
        styleImport({
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: name =>
                        `ant-design-vue/es/${name}/style/index`,
                },
            ],
        }),
        // // gzip压缩
        // new CompressionWebpackPlugin({
        //   filename: '[path][base].gz',
        //   algorithm: 'gzip',
        //   test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        //   threshold: 10240,
        //   minRatio: 0.8,
        // }),
        // // brotli压缩
        // new CompressionWebpackPlugin({
        //   filename: '[path][base].br',
        //   algorithm: 'brotliCompress',
        //   test: /\.(js|css|html|svg)$/,
        //   threshold: 10240,
        //   minRatio: 0.8,
        // }),
    ],
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000', //实际请求地址
                changeOrigin: true,
            },
        },
    },
    //别名
    alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src'),
    },
    build: {
        // 生产环境移除 console
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})