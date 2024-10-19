import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.glb"],
  plugins: [react()],
  resolve: {
    alias: { "@models": "/src/assets/models" },
  },
});
