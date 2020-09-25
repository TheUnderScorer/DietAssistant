const path = require("path");

module.exports = {
  outputDir: "build",
  configureWebpack: {
    entry: path.resolve(__dirname, "src", "render", "main.ts")
  }
};
