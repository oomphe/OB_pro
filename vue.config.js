//Vue.config.js
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "static",
  // assetslir: "./",
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  // BASE_API:
  //   process.env.NODE_ENV === "production" ? "/" : "http://47.244.100.125:9999",
  chainWebpack: config => {
    config.resolve.alias.set("image", resolve("static/img"));
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.removeAttributeQuotes = false;
    } else {
      // 为开发环境修改配置...
    }
  },
  //配置跨域问题
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    open: IS_PROD,
    host: "0.0.0.0",
    port: 8010,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API || "http://127.0.0.1:8080",
        changeOrigin: true
      }
    }
  }
};
