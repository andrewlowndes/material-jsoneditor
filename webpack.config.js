const path = require('path');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/examples/editor.tsx",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000
    }
};
