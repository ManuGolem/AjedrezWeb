import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    build: {
        outDir: "docs",
    },
    base: mode === "production" ? "AjedrezWeb" : "/",
}));
