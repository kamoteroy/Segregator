import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	build: {
		outDir: "dist", // Ensure the output directory is set correctly
		sourcemap: true, // Optional: Enable source maps for easier debugging
	},
});
