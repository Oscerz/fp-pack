import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['demo/**/*', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FpKit',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
        },
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
  },
});
