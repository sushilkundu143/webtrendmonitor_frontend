import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import raw from 'vite-plugin-raw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslintPlugin({
      include: ['src/**/*.jsx', 'src/**/*.tsx'], // include the right file types
    }),
    raw({
      // This option allows you to specify which file extensions should be treated as raw text
      // You can add any extension here, but we are only interested in .html files for this case
      match: /\.(html)$/ 
    })
  ],
  base: '/webtrendmonitor_frontend/',
})

