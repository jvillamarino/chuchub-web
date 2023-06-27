import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), image(), astroI18next()],
  output: 'hybrid'
});