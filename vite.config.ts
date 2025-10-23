import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "public/manifest.json", dest: "." },
        { src: "public/assets/icons/*", dest: "assets/icons" }
      ]
    })
  ],
  build: {
    outDir: "build",
    target: "esnext",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        content: resolve(__dirname, "./src/content.ts"),
        settings: resolve(__dirname, "./src/settings.ts"),
        blocked: resolve(__dirname, "./src/blocked.ts"),
      },
      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
        assetFileNames: "src/[name].[ext]",
        format: "es"
      }
    },
  }
});