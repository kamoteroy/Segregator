import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// Default export in ES module format
export default defineConfig({
	plugins: [vue(), tailwindcss()],
});
