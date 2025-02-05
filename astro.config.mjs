// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PLAUSIBLE_SRC: envField.string({
        context: "server",
        access: "public"
      }),
      PLAUSIBLE_DOMAIN: envField.string({
        context: "server",
        access: "public"
      }),
    }
  },
  vite: { plugins: [tailwindcss()], },
  adapter: vercel(),
  integrations: [react()],
});