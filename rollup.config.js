// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "build/bundle.cjs",
    format: "cjs",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};