import { defineConfig, loadEnv } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'
import path from 'path'


// https://vitejs.dev/config/

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return defineConfig({
        // 这里对应 nginx 中的 location
        base: '/',
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
            // themePreprocessorPlugin({
            //     less: {
                    // 主题代码
                    // multipleScopeVars: [
                    //     {
                    //         scopeName: 'theme-defalult',
                    //         path: path.resolve('src/theme/default.less'),
                    //     },
                    //     {
                    //         scopeName: 'theme-green',
                    //         path: path.resolve('src/theme/green.less'),
                    //     },
                    // ],
            //     },
            // }),
            WindiCSS(),
            vueJsx({}),
          

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
                    target: env.VITE_APP_WEB_URL, //实际请求地址
                    changeOrigin: true,
                },
            },
        },
        //别名
        alias: {
            '~': resolve(__dirname, './'), // 根目录
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
}
