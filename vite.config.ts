import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    root: isBuild ? '.' : 'examples',
    plugins: [react()],
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
    build: isBuild
      ? {
          lib: {
            entry: resolve('./src/index.ts'),
            formats: ['es'],
            fileName: () => 'index.js',
          },
          rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
          },
        }
      : undefined,
  }
})
