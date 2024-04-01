import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], 
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@lib': '/src/app/lib',
      '@shared': '/src/shared',
      '@features': '/src/features',
      '@assets': '/src/assets',
      '@entities': '/src/entities',
    },
  },
})
