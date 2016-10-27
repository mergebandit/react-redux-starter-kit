const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const entry = (isProd)
  ? './'
  : ['webpack-hot-middleware/client?reload=true', './'];


const config = {
  entry: entry,

  debug: !isProd,
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',

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
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
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
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new ExtractTextPlugin('css/[name].[hash].css', { disable: isProd })
  ],
};


if (isProd) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
