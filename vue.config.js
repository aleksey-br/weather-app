const { defineConfig } = require("@vue/cli-service");
// const Dotenv = require("dotenv-webpack");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/weather-app/" : "/",
  transpileDependencies: true,
  configureWebpack: {},
});
