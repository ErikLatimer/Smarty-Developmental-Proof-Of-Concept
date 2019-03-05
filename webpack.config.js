const webpack = require('webpack'); // We require the webpack module to access the built-in plugins within webpack
module.exports = {
    target: "node",
    entry: __dirname + "/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // The babel-loader is actaully an npm module that allows babel to be used with webpack. The babel-loader is NOT a version
                // of babel itself, so the npm babel package is still required and is required to be set up to run as it would. All the babel-loader
                // does is run that babel package within webpack.
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