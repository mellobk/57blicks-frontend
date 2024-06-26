import { defineConfig } from "vitest/config";
import Unfonts from "unplugin-fonts/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Unfonts({
			google: {
				families: ["Inter"],
			},
		}),
	],

	server: {
		host: true,
		strictPort: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: "globalThis",
			},
		},
    include: ["@react-pdf/renderer"]
	},
	define: { _global: "({})" },

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // Adjust the path accordingly
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
});
