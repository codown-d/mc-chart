/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // 根据你的项目结构调整路径
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    container: false,  // 禁用 container 类的默认样式
  },
  plugins: [],
}

