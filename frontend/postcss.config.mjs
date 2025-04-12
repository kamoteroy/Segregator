// postcss.config.mjs
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
	plugins: [
		tailwindcss(), // Use the updated PostCSS plugin for Tailwind
		autoprefixer(), // Use Autoprefixer for CSS autoprefixing
	],
};
