import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',            
      reporter: ['text', 'html'], 
      reportsDirectory: './coverage', 
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['node_modules/'], 
    }
  },
})
