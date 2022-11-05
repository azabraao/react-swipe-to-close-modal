import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      exports: "named",
      sourcemap: true,
      strict: false,
      css: true,
    },
  ],

  plugins: [
    postcss({
      inject: true,
    }),
    typescript(),
  ],
  external: ["react", "react-dom", "@azabraao/react-draggable", "clsx"],
};
