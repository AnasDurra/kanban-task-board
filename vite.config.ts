import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      features: path.resolve(__dirname, "src/features"),
      lib: path.resolve(__dirname, "src/lib"),
      pages: path.resolve(__dirname, "src/pages"),
      utils: path.resolve(__dirname, "src/utils"),
      routes: path.resolve(__dirname, "src/routes"),
    },
  },
});
