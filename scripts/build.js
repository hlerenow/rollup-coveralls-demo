// @ts-nocheck
const path = require("path");
const { terser } = require("rollup-plugin-terser");
const { plugins, libName, input, resolvePath } = require("./config");

const builds = {
  umd: {
    input,
    output: {
      format: "umd",
      file: resolvePath(`./dist/index.umd.js`),
      name: libName,
    },
    plugins: [...plugins],
  },
  "umd:min": {
    input,
    output: {
      format: "umd",
      file: resolvePath(`./dist/index.umd.min.js`),
      name: libName,
    },
    plugins: [...plugins, terser()],
  },
  cjs: {
    input,
    output: {
      format: "cjs",
      file: resolvePath(`./dist/index.cjs.js`),
      name: libName,
    },
    plugins: [...plugins],
  },
  esm: {
    input,
    output: {
      format: "es",
      file: resolvePath(`./dist/index.esm.js`),
      name: libName,
    },
    plugins: [...plugins],
  },
};

module.exports = builds[process.env.TARGET];
