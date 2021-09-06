import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src/components')}/`,
      "store/": `${path.resolve(__dirname, 'src/store')}/`,
      "utils/": `${path.resolve(__dirname, 'src/utils')}/`,
      "types/": `${path.resolve(__dirname, 'src/@types')}/`,
    },
  },
  plugins: [vue()]
})
