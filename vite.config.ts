import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY),
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/app/assets/mixins.scss";`,
        },
      },
    },
    plugins: [react()],
  };
});
