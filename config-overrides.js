const { override, addWebpackPlugin, overrideDevServer } = require('customize-cra');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const addDevServerCOOPReponseHeader = (config) => {
  config.headers = {
    ...config.headers,
    // 'Cross-Origin-Embedder-Policy': 'require-corp',
    // 'Cross-Origin-Opener-Policy': 'same-origin'
  };
  config.devMiddleware = {
    ...config.devMiddleware,
    writeToDisk: true,
  }
  return config;
};

module.exports = {
  webpack: override(
    addWebpackPlugin(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'node_modules', '@zoom', 'videosdk', 'dist', 'lib'),
            to: path.resolve(__dirname, 'public', 'lib')
          }
        ]
      })
    )
  ),
  devServer: overrideDevServer(addDevServerCOOPReponseHeader)
};
