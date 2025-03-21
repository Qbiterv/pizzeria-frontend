import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(), tailwindcss()
  ],
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'http://localhost:8081',
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/path/to/main.js',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  }
})