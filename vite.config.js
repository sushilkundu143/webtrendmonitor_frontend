import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    reportCompressedSize: true, // Report compressed sizes of the build files
    cssMinify: true,
    cssCodeSplit: true,
    minify: true
  },
})

