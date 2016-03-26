var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-source-map',
  //devtool: 'eval',  
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    'bootstrap-loader',
    './src-admin/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development"),
      'process.env.BABEL_ENV': JSON.stringify("development"),
    }),
    new ExtractTextPlugin('bundle.css', { allChunks: true })
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style', 'css'
        )
      }, {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
        ],
      }, {
        test: /glyphicons-halflings-regular\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /glyphicons-halflings-regular\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /glyphicons-halflings-regular\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /glyphicons-halflings-regular\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /glyphicons-halflings-regular\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      /* font-awesome */
      {
        test: /fontawesome-webfont\.(otf|eot|svg|ttf|woff)\??/,
        loader: "url-loader?limit=8192"
      }, {
        test: /\.jpg$/,
        loader: "url-loader?mimetype=image/jpg"
      }
    ]
  },

  postcss: [ autoprefixer ],
};
