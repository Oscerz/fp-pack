import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FpKit',
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'umd',
          name: 'FpKit',
          entryFileNames: 'fp-kit.umd.js',
          globals: {},
        },
      ],
      treeshake: {
        moduleSideEffects: false,
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
});
