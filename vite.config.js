import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/webcomponent.js',
      name: 'TvStatic',
      fileName: 'tv-static',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 