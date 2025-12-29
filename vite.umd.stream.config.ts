import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/stream/index.ts'),
      name: 'FpKitStream',
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'umd',
          name: 'FpKitStream',
          entryFileNames: 'fp-kit-stream.umd.js',
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
