const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outPath = path.resolve(__dirname, 'build');

module.exports = {
    entry: {
        main: './src/main.js',
        results: './src/results.js'
        },
    output: {
        filename: '[name].js',
        path: outpath,
        main: './src/main.js'
    },
    module: {
        rules: [
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
    devServer: {
        contentBase: outPath
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