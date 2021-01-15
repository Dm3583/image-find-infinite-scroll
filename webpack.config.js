const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        // contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        open: true,
        stats: 'errors-only'
    },

};