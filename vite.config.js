import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/webcomponent.js',
      name: 'TvStatic',
      fileName: (format) => {
        if (format === 'umd') return 'tv-static.umd.js'
        if (format === 'es') return 'tv-static.esm.js'
        return `tv-static.${format}.js`
      },
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
  },
  assetsInclude: ['**/*.glsl']
})
