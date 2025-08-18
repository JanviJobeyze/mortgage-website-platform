import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Skip optional platform-specific dependencies
      onwarn(warning, warn) {
        if (warning.code === 'MISSING_OPTIONAL_DEPENDENCY') {
          return;
        }
        warn(warning);
      }
    },
    // Use terser instead of esbuild for better compatibility
    minify: 'terser',
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
