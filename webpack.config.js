const webpack = require('webpack')
const path = require('path')

const HappyPack = require('happypack')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var config = {
  devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './app'),
  entry: {
    common: [
      'babel-polyfill',
      'highlight.js/lib/highlight',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/bash',
      './components/tags/highlight.js',
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('autoprefixer'), require('precss')]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        // inline base64 URLs for <=8k images, direct URLs for the rest
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      'node_modules'
    ],
    alias: {
      '~': path.join(__dirname, './app')
    }
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new HappyPack({
      loaders: [ 'babel-loader?cacheDirectory' ],
      threads: 4
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${['javascript', 'bash'].join('|')})$`),
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      filename: 'common.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ].concat(isProd ? [] : [
    new webpack.NamedModulesPlugin()
  ]),
  devServer: {
    contentBase: './app'
  }
}

// development mode
if (!isProd) {
  Object.keys(config.entry).forEach(function (k) {
    config.entry[k].unshift(
      'webpack-dev-server/client?http://0.0.0.0:2000'
    )
  })
}

module.exports = config
