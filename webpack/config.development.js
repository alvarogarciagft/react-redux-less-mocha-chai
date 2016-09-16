var path = require('path');
var webpack = require('webpack');
var DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'source-map', // 'eval'
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ResolverPlugin(new DirectoryNamedWebpackPlugin()),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new WebpackNotifierPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('./src/'),
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
      },
      {
        test: /\.less$/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'less'
        ]
      },
      {
        test: /\.png$|\.gif$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpe?g$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
