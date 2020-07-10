import path from "path";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import prettier from "rollup-plugin-prettier";
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import pkg from "../package.json";

const libName = "Test";
const plugins = [
  replace({
    __BUILD_TIME__: Date.now().toString(),
    __VERSION__: pkg.version,
  }),
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
];

function resolvePath(pt) {
  return path.resolve(__dirname, "../", pt);
}

const builds = {
  umd: {
    input: resolvePath("src/index.ts"),
    output: {
      format: "umd",
      file: `dist/index.umd.js`,
      name: libName,
    },
    plugins: [...plugins],
  },
  "umd:min": {
    input: resolvePath("src/index.ts"),
    output: {
      format: "umd",
      file: `dist/index.umd.min.js`,
      name: libName,
    },
    plugins: [...plugins, terser()],
  },
  cjs: {
    input: resolvePath("src/index.ts"),
    output: {
      format: "cjs",
      file: `dist/index.cjs.js`,
      name: libName,
    },
    plugins: [...plugins],
  },
  esm: {
    input: resolvePath("src/index.ts"),
    output: {
      format: "es",
      file: `dist/index.esm.js`,
      name: libName,
    },
    plugins: [...plugins],
  },
};

export default builds[process.env.TARGET];
