import { fileURLToPath } from 'url'
import path from 'path'

import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'

// ESM compatibility: Define __dirname equivalent for ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load env file
dotenv.config()

export default defineConfig({
  plugins: [viteReact()],

  // Define environment variables
  // Security Note: These values will be inlined in the client bundle.
  // Only include non-sensitive values that are safe for client exposure.
  define: {
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.DEMO': JSON.stringify(process.env.DEMO),
    global: {}, // Minimal polyfill for global if needed by some libraries
  },

  resolve: {
    alias: {
      // Ensure consistent path resolution across dev/prod
      '@': path.resolve(__dirname, './src/client'),
      '@resources': path.resolve(__dirname, './src/resources'),
      // Browser polyfills for Node.js built-ins
      stream: 'stream-browserify',
      path: 'path-browserify',
    },
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'redux', 'react-redux'],
        },
      },
    },
    chunkSizeWarningLimit: 512,
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/client/styles/_variables.scss";`,
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'axios',
      'redux',
      'react-redux',
      'codemirror',
      'react-codemirror2',
    ],
  },
})
