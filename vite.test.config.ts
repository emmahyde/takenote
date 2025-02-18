import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

// Define __dirname for ESM compatibility
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [viteReact()],
  test: {
    globals: true,
    environment: 'jsdom', // Switched from 'happy-dom' to 'jsdom' for a more complete DOM simulation
    setupFiles: ['./src/client/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'tests/e2e/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'tests/__mocks__/'],
    },
    alias: {
      '@': resolve(__dirname, './src/client'),
      '@resources': resolve(__dirname, './src/resources'),
    },
  },
})
