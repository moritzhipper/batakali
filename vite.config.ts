import react from "@vitejs/plugin-react"
import path from "path"
import postCssCustomMedia from "postcss-custom-media"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postCssCustomMedia]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: ["./src/assets/models/images/**/*"]
    }
  }
})
