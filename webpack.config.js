const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const path = require('path');

const rulesForHTML = {
  test: /\.html$/i,
  loader: 'html-loader',
  options: {
    minimize: true,
    sources: false,
  },
};

const rulesForStyles = {
  test: /\.(sa|sc|c)ss$/i,
  exclude: /styles.(sa|sc|c)ss$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
};

const rulesForMainStylesFile = {
  test: /styles.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: './',
      },
    },
    'css-loader',
    'sass-loader',
    'postcss-loader',
  ],
};

const rulesForJSAndJSX = {
  test: /\.jsx?$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

const rulesForFiles = {
  test: /\.(jpe?g|png|gif|svg|webp)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/img/[name].[ext]',
  },
  loader: 'image-webpack-loader',
};

const rulesForFonts = {
  test: /\.(woff|ttf)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/fonts/[name].[ext]',
  },
  loader: 'image-webpack-loader',
};

const rules = [rulesForHTML, rulesForStyles, rulesForMainStylesFile, rulesForJSAndJSX, rulesForFiles, rulesForFonts];

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === 'production';

  return {
    output: {
      clean: true,
      filename: isProduction ? '[name].[fullhash].js' : 'main.js',
      path: path.resolve(__dirname, 'build'),
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: isProduction ? '[name].[fullhash].html' : 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[fullhash].css' : 'main.css',
        ignoreOrder: false,
      }),
    ],
    module: {
      rules: [{ rules }],
    },
  };
};
