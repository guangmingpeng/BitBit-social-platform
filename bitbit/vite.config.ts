import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/store": path.resolve(__dirname, "./src/store"),
    },
  },
});
