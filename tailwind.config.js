/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 自定义 Catbook 品牌蓝 (稍微暖一点的FB蓝)
        catbookBlue: {
          DEFAULT: '#4267B2', 
          dark: '#365899',
          light: '#6d84b4'
        },
        // 背景灰
        catBg: '#f0f2f5',
      }
    },
  },
  plugins: [],
}