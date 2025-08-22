import { defineConfig } from 'vite';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cms: resolve(__dirname, 'cms.html')
      },
      output: {
        manualChunks: {
          vendor: ['bootstrap', '@popperjs/core'],
          aos: ['aos']
        }
      }
    },
    copyPublicDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/scss/base/variables" as *;`,
        // Optional: Silence Sass deprecation warnings from Bootstrap
        // This is the official Bootstrap team recommendation
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
          'legacy-js-api',
        ],
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['bootstrap', '@popperjs/core', 'aos']
  }
});
