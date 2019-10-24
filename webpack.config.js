const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        results: './src/results.js'
        },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({ //add index.html to build
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({ //add form.html to build
            inject: "head",
            chunks: ['main'],
            template: './src/form.html',
            filename: 'form.html' 
        }),
        new HtmlWebpackPlugin({ //add results.html to build
            inject: "head",
            chunks: ['results'],
            template: './src/results.html',
            filename: 'results.html' 
        })
        //If you add new pages to src, also add them here
    ]
};