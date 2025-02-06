import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

// same as this tsconfig
//
// "paths": {
//   "@/*": ["src/*"],
//   "@components/*": ["src/components/*"],
//   "@layouts/*": ["src/layouts/*"],
//   "@lib/*": ["src/lib/*"],
//   "@styles/*": ["src/styles/*"]
// }

function resolveToHere(...paths) {
  return resolve(__dirname, ...paths)
}



export default defineConfig({
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      '@': resolveToHere('src'),
      '@components': resolveToHere('src/components'),
      '@layouts': resolveToHere('src/layouts'),
      '@lib': resolveToHere('src/lib'),
      '@styles': resolveToHere('src/styles'),
    }
  }
})
