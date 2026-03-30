import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const PrerenderPlugin = require('vite-plugin-prerender')

export default defineConfig({
  build: {
    target: 'chrome77',
  },
  plugins: [
    react(),
    PrerenderPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/diensten', '/fotos', '/contact'],
      rendererOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        renderAfterElementExists: 'header',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      'lucide-react@0.487.0': 'lucide-react',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
    },
  },
})
