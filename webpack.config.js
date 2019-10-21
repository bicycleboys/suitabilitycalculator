const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
        },
    output: {
        filename: 'main.js',
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
            chunks: 'main',
            template: './src/form.html',
            filename: 'form.html' 
        })
        //If you add new pages to src, also add them here
    ]
};