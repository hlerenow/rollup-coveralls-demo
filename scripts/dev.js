// @ts-nocheck
const del = require("rollup-plugin-delete");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const prettier = require("rollup-plugin-prettier");
const { eslint } = require("rollup-plugin-eslint");
const { plugins, libName, input, resolvePath } = require("./config");

module.exports = {
  input,
  output: {
    file: resolvePath(`./dist/index.js`),
    format: "umd",
    name: libName,
  },
  plugins: [
    ...plugins,
    eslint(),
    prettier(),
    del({ targets: resolvePath("dist/*") }),
    livereload(),
    serve({
      historyApiFallback: true,
      contentBase: ["dist", "public"],
      port: 8080,
    }),
  ],
};
