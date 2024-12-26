// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/work/mc-chart/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1_less@4.2.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import postcsspxtoviewport from "file:///D:/work/mc-chart/node_modules/.pnpm/postcss-px-to-viewport-8-plugin@1.2.5/node_modules/postcss-px-to-viewport-8-plugin/lib/index.js";
import vue from "file:///D:/work/mc-chart/node_modules/.pnpm/@vitejs+plugin-vue@5.2.0_vite@5.4.11_@types+node@22.10.1_less@4.2.0_terser@5.36.0__vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/work/mc-chart/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.27.3_vue@3.5.13/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///D:/work/mc-chart/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.27.3_vue@3.5.13/node_modules/unplugin-vue-components/dist/resolvers.js";
import tailwindcss from "file:///D:/work/mc-chart/node_modules/.pnpm/tailwindcss@3.4.15/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/work/mc-chart/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.49/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///D:/work/mc-chart/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    })
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
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
        rewrite: (path) => path.replace(/^\/api/, "")
      }
      // "/api": {
      //   //target: "http://localhost:8087",
      //     // target: "http://120.197.149.12:8087",
      //   target: "http://43.143.215.181:9999",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: [
        tailwindcss,
        // 使用 ESM 语法导入 TailwindCSS
        autoprefixer,
        postcsspxtoviewport({
          unitToConvert: "px",
          // 要转化的单位
          viewportWidth: 1920,
          // UI设计稿的宽度
          viewportHeight: 1080,
          // UI设计稿的宽度
          propList: ["*"],
          // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw",
          // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw",
          // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"],
          // 指定不转换为视窗单位的类名，
          minPixelValue: 1,
          // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true,
          // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true,
          // 是否转换后直接更换属性值
          //exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          // exclude: [],
          landscape: false
          // 是否处理横屏情况
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXG1jLWNoYXJ0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXG1jLWNoYXJ0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL21jLWNoYXJ0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBwb3N0Y3NzcHh0b3ZpZXdwb3J0IGZyb20gXCJwb3N0Y3NzLXB4LXRvLXZpZXdwb3J0LTgtcGx1Z2luXCI7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnO1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLCAvLyBjc3MgaW4ganNcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDMwMDEsXHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuICAgIGh0dHBzOiBmYWxzZSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgLy90YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg3XCIsXHJcbiAgICAgICAgICAvLyB0YXJnZXQ6IFwiaHR0cDovLzEyMC4xOTcuMTQ5LjEyOjgwODdcIixcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzQzLjE0My4yMTUuMTgxOjk5OTlcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcIi9hcGlcIjoge1xyXG4gICAgICAvLyAgIC8vdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4N1wiLFxyXG4gICAgICAvLyAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly8xMjAuMTk3LjE0OS4xMjo4MDg3XCIsXHJcbiAgICAgIC8vICAgdGFyZ2V0OiBcImh0dHA6Ly80My4xNDMuMjE1LjE4MTo5OTk5XCIsXHJcbiAgICAgIC8vICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcclxuICAgICAgLy8gfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgbGVzczoge1xyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHRhaWx3aW5kY3NzLCAgLy8gXHU0RjdGXHU3NTI4IEVTTSBcdThCRURcdTZDRDVcdTVCRkNcdTUxNjUgVGFpbHdpbmRDU1NcclxuICAgICAgICBhdXRvcHJlZml4ZXIsXHJcbiAgICAgICAgcG9zdGNzc3B4dG92aWV3cG9ydCh7XHJcbiAgICAgICAgICB1bml0VG9Db252ZXJ0OiBcInB4XCIsIC8vIFx1ODk4MVx1OEY2Q1x1NTMxNlx1NzY4NFx1NTM1NVx1NEY0RFxyXG4gICAgICAgICAgdmlld3BvcnRXaWR0aDogMTkyMCwgLy8gVUlcdThCQkVcdThCQTFcdTdBM0ZcdTc2ODRcdTVCQkRcdTVFQTZcclxuICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiAxMDgwLCAvLyBVSVx1OEJCRVx1OEJBMVx1N0EzRlx1NzY4NFx1NUJCRFx1NUVBNlxyXG4gICAgICAgICAgcHJvcExpc3Q6IFtcIipcIl0sIC8vIFx1NjMwN1x1NUI5QVx1OEY2Q1x1NjM2Mlx1NzY4NGNzc1x1NUM1RVx1NjAyN1x1NzY4NFx1NTM1NVx1NEY0RFx1RkYwQypcdTRFRTNcdTg4NjhcdTUxNjhcdTkwRThjc3NcdTVDNUVcdTYwMjdcdTc2ODRcdTUzNTVcdTRGNERcdTkwRkRcdThGREJcdTg4NENcdThGNkNcdTYzNjJcclxuICAgICAgICAgIHZpZXdwb3J0VW5pdDogXCJ2d1wiLCAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdThGNkNcdTYzNjJcdTYyMTBcdTc2ODRcdTg5QzZcdTdBOTdcdTUzNTVcdTRGNERcdUZGMENcdTlFRDhcdThCQTR2d1xyXG4gICAgICAgICAgZm9udFZpZXdwb3J0VW5pdDogXCJ2d1wiLCAvLyBcdTYzMDdcdTVCOUFcdTVCNTdcdTRGNTNcdTk3MDBcdTg5ODFcdThGNkNcdTYzNjJcdTYyMTBcdTc2ODRcdTg5QzZcdTdBOTdcdTUzNTVcdTRGNERcdUZGMENcdTlFRDhcdThCQTR2d1xyXG4gICAgICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFtcImlnbm9yZS1cIl0sIC8vIFx1NjMwN1x1NUI5QVx1NEUwRFx1OEY2Q1x1NjM2Mlx1NEUzQVx1ODlDNlx1N0E5N1x1NTM1NVx1NEY0RFx1NzY4NFx1N0M3Qlx1NTQwRFx1RkYwQ1xyXG4gICAgICAgICAgbWluUGl4ZWxWYWx1ZTogMSwgLy8gXHU5RUQ4XHU4QkE0XHU1MDNDMVx1RkYwQ1x1NUMwRlx1NEU4RVx1NjIxNlx1N0I0OVx1NEU4RTFweFx1NTIxOVx1NEUwRFx1OEZEQlx1ODg0Q1x1OEY2Q1x1NjM2MlxyXG4gICAgICAgICAgbWVkaWFRdWVyeTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1NzI4XHU1QTkyXHU0RjUzXHU2N0U1XHU4QkUyXHU3Njg0Y3NzXHU0RUUzXHU3ODAxXHU0RTJEXHU0RTVGXHU4RkRCXHU4ODRDXHU4RjZDXHU2MzYyXHVGRjBDXHU5RUQ4XHU4QkE0ZmFsc2VcclxuICAgICAgICAgIHJlcGxhY2U6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OEY2Q1x1NjM2Mlx1NTQwRVx1NzZGNFx1NjNBNVx1NjZGNFx1NjM2Mlx1NUM1RVx1NjAyN1x1NTAzQ1xyXG4gICAgICAgICAgLy9leGNsdWRlOiBbL25vZGVfbW9kdWxlcy9dLCAvLyBcdThCQkVcdTdGNkVcdTVGRkRcdTc1NjVcdTY1ODdcdTRFRjZcdUZGMENcdTc1MjhcdTZCNjNcdTUyMTlcdTUwNUFcdTc2RUVcdTVGNTVcdTU0MERcdTUzMzlcdTkxNERcclxuICAgICAgICAgIC8vIGV4Y2x1ZGU6IFtdLFxyXG4gICAgICAgICAgbGFuZHNjYXBlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1OTA0XHU3NDA2XHU2QTJBXHU1QzRGXHU2MEM1XHU1MUI1XHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG5cclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdPLFNBQVMsZUFBZSxXQUFXO0FBQzNRLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQVBvSCxJQUFNLDJDQUEyQztBQVM5TCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxxQkFBcUI7QUFBQSxVQUNuQixhQUFhO0FBQUE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFHTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUY7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQSxvQkFBb0I7QUFBQSxVQUNsQixlQUFlO0FBQUE7QUFBQSxVQUNmLGVBQWU7QUFBQTtBQUFBLFVBQ2YsZ0JBQWdCO0FBQUE7QUFBQSxVQUNoQixVQUFVLENBQUMsR0FBRztBQUFBO0FBQUEsVUFDZCxjQUFjO0FBQUE7QUFBQSxVQUNkLGtCQUFrQjtBQUFBO0FBQUEsVUFDbEIsbUJBQW1CLENBQUMsU0FBUztBQUFBO0FBQUEsVUFDN0IsZUFBZTtBQUFBO0FBQUEsVUFDZixZQUFZO0FBQUE7QUFBQSxVQUNaLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUdULFdBQVc7QUFBQTtBQUFBLFFBQ2IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
