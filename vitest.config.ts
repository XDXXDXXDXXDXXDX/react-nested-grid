import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^react-nested-grid$/,
        replacement: resolve('./src/index.ts'),
      },
      {
        find: 'src',
        replacement: resolve('./src'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
})
