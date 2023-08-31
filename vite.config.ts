/// <reference types="vitest" />

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import path, { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
import UnoCSS from "unocss/vite"
import viteCompression from "vite-plugin-compression"
import viteImagemin from "vite-plugin-imagemin"

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
        "@": resolve(__dirname, "./src")
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
      open: true,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      /*
      // https://juejin.cn/post/7209852595002409018
      例如：https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1/login是后端的接口
      当target设置为https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/
      那么我们在前端请求接口时，只需要写成 /api/v1/login （因为/api/v1是baseURL，所有只要写/login ）就会变成：
      即==》 https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1/login
      也就不用rewrite了
       */
      proxy: {
        // "/api/v1": {
        //   // target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1",
        //   target: "https://www.fastmock.site/mock/761e2dda2b8890ab86c928a74e8f6538/api/v1",
        //   ws: true,
        //   /** 是否允许跨域 */
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace("/api/v1", "")
        // }
        "/api/v1": {
          // target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1",
          target: "https://www.fastmock.site/mock/761e2dda2b8890ab86c928a74e8f6538",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: "dist",
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: "terser",
      // vite打包是通过rollup来打包的
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"
            }
          }
        }
      },
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"] // 移除console
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      reportCompressedSize: false,
      /** 打包后是否生成 source map 文件 */
      sourcemap: false
      // /** 打包后静态资源目录 */
      // assetsDir: "static"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS(),
      /** Gzip 压缩 */
      viteCompression({
        verbose: true, // 是否在控制台中输出压缩结果
        disable: false, //是否禁用压缩，默认为 false
        threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
        algorithm: "brotliCompress", // 压缩算法，默认gzip，可选brotliCompress
        ext: ".br",
        deleteOriginFile: false // 是否删除原文件,默认为false
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      })
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  }
}
