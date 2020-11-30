const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    main: './src/main.ts',
    allResults: './src/allResults.ts'
  },
  module: {

    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: outPath
  },
  devServer: {
    contentBase: outPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico'
    }),
    new HtmlWebpackPlugin({ //add index.html to build
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({ //add LTS.html to build
      inject: false,
      template: './src/LTS.html',
      filename: 'LTS.html'
    }),
    new HtmlWebpackPlugin({ //add BLOS.html to build
      inject: false,
      template: './src/BLOS.html',
      filename: 'BLOS.html'
    }),
    new HtmlWebpackPlugin({ //add PLOS.html to build
      inject: false,
      template: './src/PLOS.html',
      filename: 'PLOS.html'
    }),
    new HtmlWebpackPlugin({ //add form.html to build
      inject: "head",
      chunks: ['main'],
      template: './src/form.html',
      filename: 'form.html'
    }),
    new HtmlWebpackPlugin({ //add allResults.html to build
      inject: "head",
      chunks: ['allResults'],
      template: './src/allResults.html',
      filename: 'allResults.html'
    }),
    //If you add new pages to src, also add them here
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      
      //to reroute form.hmtl with any query strings to form.html file
      //kinda hacky but what are you gonna do
      navigateFallback: 'form.html',
      navigateFallbackWhitelist: [/^\/form.html/]
    }),
    new CopyPlugin([
      {from: "src/manifest.json", to: outPath+"/manifest.json" },
      {from: "images/icon512.png", to: outPath+"/icon512.png"},
      {from: "images/icon192.png", to: outPath+"/icon192.png"},
    ]),
  ]
};
