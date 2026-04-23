// astro-src/astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
export default defineConfig({
  site: 'https://fumihubcns.github.io',
  base: '/Verilog-HDL_Notebook/',
  integrations: [mdx()],
});