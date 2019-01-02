//Vue.config.js
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "static",
  // assetslir: "./",
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: config => {
    config.resolve.alias.set("image", resolve("static/img"));
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.removeAttributeQuotes = false;
    } else {
      // 为开发环境修改配置...
    }
  }
  // devServer: {
  //   proxy: "http://192.168.12.65:8091"
  // }
};
