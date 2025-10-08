import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
