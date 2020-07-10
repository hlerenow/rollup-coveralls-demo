import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import prettier from "rollup-plugin-prettier";
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import del from "rollup-plugin-delete";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

const libName = "Test";
const plugins = [
  replace({
    __BUILD_TIME__: Date.now().toString(),
    __VERSION__: pkg.version,
  }),
  del({ targets: "dist/*" }),
  eslint(),
  resolve(),
  commonjs(),
  json(),
  typescript(),
  babel({
    // 只编译源代码
    exclude: "node_modules/**",
  }),
  prettier({
    parser: "babel",
    tabWidth: 2,
    singleQuote: true,
  }),
  livereload(),
  serve({
    historyApiFallback: true,
    contentBase: ["dist", "public"],
    port: 8080,
  }),
];

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: libName,
  },
  plugins,
};
