import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "public/manifest.json", dest: "." }],
    })
  ],
  build: {
    outDir: "build",
    target: "esnext",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        content: resolve(__dirname, "./src/content.ts"),
        settings: resolve(__dirname, "./src/settings.ts")
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        format: "es",
      }
    },
    emptyOutDir: true
  }
});