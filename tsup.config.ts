import { defineConfig } from "tsup";


export default defineConfig({
    name: "opticore-installer",
    format: ["cjs", "esm"],
    entry: ['src/index.ts'] ,
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true
});