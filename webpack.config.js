const path = require('path');
const HTMLWebpackplugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web';
const isProd = !isDev;
const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [['@babel/transform-runtime']],
      },
    },
  ];
  return loaders;
};

const optimization = () => {
  const config = {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  };
  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './js/index.js',
    localStorage: './js/localStorage.js',
    time: './js/time.js',
    quote: './js/quote.js',
    weather: './js/weather.js',
    audioPlayer: './js/audioPlayer.js',
    playList: './js/playList.js',
    slider: './js/slider.js',
    random: './js/random.js',
    settings: './js/settings.js',
    translate: './js/translate.js',
  },
  devtool: isProd ? false : 'inline-source-map',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[file]',
  },
  target: target,

  devServer: {
    port: 3000,
    open: true,
    contentBase: '/',
  },
  plugins: [
    new HTMLWebpackplugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${filename('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },

        {
          from: path.resolve(__dirname, 'src/quotesEn.json'),
          to: path.resolve(__dirname, 'dist/quotesEn.json'),
        },
        {
          from: path.resolve(__dirname, 'src/quotesRU.json'),
          to: path.resolve(__dirname, 'dist/quotesRU.json'),
        },
      ],
    }),
    new ESLintPlugin(),
  ],

  module: {
    rules: [
      /** Babel **/
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
        // npm install babel-loader @babel/core @babel/preset-env -D
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',

          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        // npm i style-loader css-loader sass sass-loader -D
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: optimization(),
};
