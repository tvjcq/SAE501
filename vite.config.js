import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(() => ({
  // Base path for GitHub Pages (replace with your repo name if different)
  base: "/SAE501/",
  plugins: [react(), tailwindcss()],
}));
