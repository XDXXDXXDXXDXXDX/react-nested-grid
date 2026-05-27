import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    root: isBuild ? '.' : 'examples',
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: /^react-nested-grid$/,
          replacement: new URL('./src/index.ts', import.meta.url).pathname,
        },
        {
          find: 'src',
          replacement: new URL('./src', import.meta.url).pathname,
        },
      ],
    },
    build: isBuild
      ? {
          lib: {
            entry: new URL('./src/index.ts', import.meta.url).pathname,
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
