const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    plugins: [
        new HtmlWebpackPlugin({ //add index.html to build
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({ //add form.html to build
            template: './src/form.html',
            filename: 'form.html' 
        })
    ]
};