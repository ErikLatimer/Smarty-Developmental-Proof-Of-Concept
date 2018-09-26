const webpack = require('webpack'); // We require the webpack module to access the built-in plugins within webpack
module.exports = {
    target: "node",
    entry: __dirname + "/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'babeled_through.js',
        path: __dirname + '/build'
    },
    plugins: [
        new webpack.IgnorePlugin(/^pg-native$/)
    ]
};