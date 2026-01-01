import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FpPack',
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'umd',
          name: 'FpPack',
          entryFileNames: 'fp-pack.umd.js',
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
