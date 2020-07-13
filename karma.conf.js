// @ts-nocheck
const { plugins } = require("./scripts/config");

module.exports = function karmaConfig(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [{ pattern: "test/**/*.js" }],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    reporters: ["progress", "coverage", "coveralls"],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      "./test/**/*.js": ["rollup"],
      "src/**/*.ts": ["coverage"],
    },
    coverageReporter: {
      // specify a common output directory
      dir: "coverage",
      reporters: [
        // reporters not supporting the `file` property
        { type: "html", subdir: "report-html" },
        { type: "lcov", subdir: "report-lcov" },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: "cobertura", subdir: ".", file: "cobertura.txt" },
        { type: "lcovonly", subdir: ".", file: "report-lcovonly.txt" },
        { type: "teamcity", subdir: ".", file: "teamcity.txt" },
        { type: "text", subdir: ".", file: "text.txt" },
        { type: "text-summary", subdir: ".", file: "text-summary.txt" },
      ],
    },
    rollupPreprocessor: {
      plugins,
      output: {
        format: "umd", // Helps prevent naming collisions.
        sourcemap: "inline", // Sensible for testing.
      },
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
