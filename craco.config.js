const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const glob = require("glob");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const config = {
        ...webpackConfig,
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          content: glob
            .sync(`${paths.appSrc}/chromeServices/content/**/*.ts`)
            .map((f) => path.resolve(__dirname, f)),
          background: "./src/chromeServices/background.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            url: require.resolve("url"),
          },
        },
      };
      return config;
    },
  },
};
