import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import  {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
              // Specify the icon folder to be cached
              iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
              // Specify symbolId format
              symbolId: 'icon-[dir]-[name]',
            }),
    ],
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      }
    }
  },
  // 代理跨域
  server: {
    proxy: {
      '/api/web': {
        target: 'http://47.120.4.5:8023',
        // 需要代理跨域
        changeOrigin: true,
        // 路径重写
        rewrite: (path) => path.replace('/^\/api/', '')
      }
    }
  }
})
