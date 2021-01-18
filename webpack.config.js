const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ],
    },
    devServer: {
        // contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        open: true,
        stats: 'errors-only'
    },
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })]

};