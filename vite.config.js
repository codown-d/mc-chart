import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin";
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3001,
    // 是否开启 https
    https: false,
    proxy: {
      "/api": {
        //target: "http://localhost:8087",
          // target: "http://120.197.149.12:8087",
        target: "http://43.143.215.181:9999",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/v2": {
        //target: "http://localhost:8087",
          // target: "http://120.197.149.12:8087",
        target: "http://43.143.215.181:9999",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        tailwindcss,  // 使用 ESM 语法导入 TailwindCSS
        autoprefixer,
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 1920, // UI设计稿的宽度
          viewportHeight: 1080, // UI设计稿的宽度
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          //exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          // exclude: [],
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },

  },
})
