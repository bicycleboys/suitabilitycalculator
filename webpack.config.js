const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    main: './src/main.js'
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
    filename: 'main.js',
    path: outPath,
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
    new HtmlWebpackPlugin({ //add form.html to build
      inject: "head",
      chunks: 'main',
      template: './src/form.html',
      filename: 'form.html'
    }),
    //If you add new pages to src, also add them here
  ]
};
