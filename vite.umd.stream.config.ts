import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/stream/index.ts'),
      name: 'FpPackStream',
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'umd',
          name: 'FpPackStream',
          entryFileNames: 'fp-pack-stream.umd.js',
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
