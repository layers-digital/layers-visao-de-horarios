const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  devServer: {
    port: 7350,
  },
  configureWebpack: {
    plugins: [new HardSourceWebpackPlugin()],
  },
};
