const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  // publicPath: "/Pokemon/",
  publicPath: process.env.NODE_ENV === "production" ? "/Pokemon/" : "/",
  outputDir: "docs",
  // devServer: {
  // overlay: false,
  // proxy: {
  //   "/api": {
  //     target: process.env.VUE_APP_DEV_API,
  //     changeOrigin: true,
  //   },
  // },
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/variables.scss";
        `,
      },
    },
  },
};
