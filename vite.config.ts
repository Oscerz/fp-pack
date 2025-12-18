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
      fileName: (format) => {
        return format === 'umd' ? 'fp-kit.umd.js' : 'fp-kit.mjs';
      },
    },
    rollupOptions: {
      // 외부 의존성이 있다면 여기에 추가
      external: [],
      output: {
        globals: {},
      },
    },
    sourcemap: true,
  },
});
