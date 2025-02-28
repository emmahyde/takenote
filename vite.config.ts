import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      // Make process.env available in the client
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV || 'development'),
        CLIENT_ID: JSON.stringify(env.CLIENT_ID || ''),
        CLIENT_SECRET: JSON.stringify(env.CLIENT_SECRET || ''),
        DEMO: JSON.stringify(env.DEMO || ''),
      },
      // Define global for libraries that expect it (like react-codemirror2)
      global: 'window',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/client'),
        '@resources': path.resolve(__dirname, './src/resources'),
      },
    },
    server: {
      port: 3002,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  }
})
