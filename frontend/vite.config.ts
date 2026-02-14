import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Priority 1: Large individual libraries
            if (id.includes('@mui/material')) return 'v-mui-mat';
            if (id.includes('@mui/icons-material')) return 'v-mui-icons';
            if (id.includes('three/examples')) return 'v-three-ex';
            if (id.includes('three/')) return 'v-three-core'; // Still likely to be large
            if (id.includes('@react-three/drei')) return 'v-r3-drei';
            if (id.includes('@react-three/fiber')) return 'v-r3-fiber';
            if (id.includes('framer-motion')) return 'v-framer';
            if (id.includes('recharts')) return 'v-charts';
            if (id.includes('react-dom')) return 'v-react-dom';
            if (id.includes('react/')) return 'v-react-core';

            // Priority 2: Other significant libraries
            const pkgName = id.split('node_modules/')[1].split('/')[0].toLowerCase();
            if (pkgName.includes('axios')) return 'v-axios';
            if (pkgName.includes('zod')) return 'v-zod';
            if (pkgName.includes('zustand')) return 'v-zustand';
            if (pkgName.includes('socket.io')) return 'v-socket';

            // Priority 3: Grouped vendors by name to stay under 500kb
            const char = pkgName.replace('@', '')[0];
            if (char <= 'f') return 'v-libs-a-f';
            if (char <= 'm') return 'v-libs-g-m';
            if (char <= 's') return 'v-libs-n-s';
            return 'v-libs-t-z';
          }
        },
      },
    },
  },
})
