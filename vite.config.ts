/// <reference types="vitest" />

import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'

/** 配置项文档：https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData的内容会在每个scss文件的开头自动注入，这样就可以全局使用scss了
          // 由于css文件是运行时的，所有variable.css文件不用注入，当为variable.scss是需要注入的
          additionalData: '@use "@/styles/mixins.scss" as *;'
          // 支持导入多个scss文件
          //  additionalData: '@import "@/styles/variable.scss"; @import "@/styles/mixin.scss";'
        }
      }
    },
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 反向代理 */
      // https://juejin.cn/post/7209852595002409018
      // 去匹配 /api/v1 这个路径，假如发送的请求包含了这个路径，那么就将进行反向代理，将请求代理到 target 字段配置的路径
      // 直接采用这种反向代理的好处就是前端调用后端接口时不会产生跨域问题，但要记得这只是开发环境配置好了反向代理，以后部署前端到线上环境的时候，
      // 需要采用 Nginx 或其他工具来实现线上环境的反向代理
      proxy: {
        '/api/v1': {
          target: 'https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1',
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/v1', '')
        }
      }
    },
    build: {
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static'
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'jsdom'
    }
  }
}
