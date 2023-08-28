import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		strictPort: true,
	},
	define: {
		global: {},
	},
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
