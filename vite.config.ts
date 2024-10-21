import react from "@vitejs/plugin-react"
import postCssCustomMedia from "postcss-custom-media"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.glb"],
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postCssCustomMedia]
    }
  },
  resolve: {
    alias: { "@models": "/src/assets/models" }
  }
})
