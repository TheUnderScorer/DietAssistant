const path = require("path");

module.exports = {
  outputDir: "build",

  configureWebpack: {
    entry: path.resolve(__dirname, "src", "render", "main.ts"),
  },

  publicPath: "./",

  chainWebpack: (config) => {
    config.plugin("fork-ts-checker").tap((args) => {
      args[0].typescript.configFile = "./tsconfig.vue.json";
      return args;
    });
  },
};
