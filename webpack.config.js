const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var config = {
  devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './app'),
  entry: {
    common: [
      'babel-polyfill', 'react', 'react-highlight',
      './index.js'
    ],
    homepage: [
      './scenes/homepage/scene.js'
    ],
    api: [
      './scenes/api/logic/scene.js',
      './scenes/api/component/scene.js',
      './scenes/api/connect/scene.js',
      './scenes/api/reducer/scene.js',
      './scenes/api/saga/scene.js',
      './scenes/api/action/scene.js'
    ],
    playground: [
      './scenes/playground/scene.js'
    ],
    guide: [
      './scenes/guide/installation/scene.js',
      './scenes/guide/counter/scene.js',
      './scenes/guide/counter-dynamic/scene.js',
      './scenes/guide/sliders/scene.js',
      './scenes/guide/connected/scene.js'
    ],
    exampleTodos: [
      './scenes/examples/todos/scene.js'
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
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: isProd ? {} : {
          plugins: [
            [
              'react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }
                ]
              }
            ]
          ]
        }
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
  plugins: [
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
