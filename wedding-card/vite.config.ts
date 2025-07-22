import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    UnpluginInjectPreload({
      files: [
        {
          entryMatch: /.*\.woff2$/,
          attributes: {
            crossorigin: "anonymous",
          },
        },
        // {
        //   outputMatch: /.*.(css|js)$/,
        // },
      ],
    }),
    analyzer(),
  ],
});
