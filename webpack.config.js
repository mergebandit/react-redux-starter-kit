const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './index',
  ],

  debug: true,
  devtool: 'cheap-module-source-map',

  output: {
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, '/dist'),
    sourceMapFilename: 'js/[name].map',
    chunkFilename: 'js/[id].chunk.[hash].js',
    publicPath: '/',
  },

  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  resolve: {
    root: [
      path.resolve(__dirname, 'app'),
    ],
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'], exclude: /node_modules/ },
    ],
  },

  postcss: function() {
    return [
      require('postcss-import'),
      require('precss'),
      require('postcss-math'),
      require('autoprefixer')({ browsers: ['> 1%'] }),
      require('css-mqpacker'),
    ];
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
  ],
};
