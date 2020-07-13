/* eslint-disable global-require */
// @ts-nocheck
const replace = require("@rollup/plugin-replace");
const json = require("rollup-plugin-json");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const typescript = require("rollup-plugin-typescript2");
const path = require("path");
const pkg = require("../package.json");

function resolvePath(pt) {
  return path.resolve(__dirname, "../", pt);
}

const libName = "Test";
const plugins = [
  replace({
    __BUILD_TIME__: Date.now().toString(),
    __VERSION__: pkg.version,
  }),
  resolve(),
  commonjs(),
  json(),
  typescript(),
  babel({
    // 只编译源代码
    exclude: "node_modules/**",
  }),
];

const input = resolvePath("./src/index.ts");

module.exports = {
  plugins,
  libName,
  resolvePath,
  input,
};
