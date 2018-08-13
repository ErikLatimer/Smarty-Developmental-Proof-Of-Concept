module.exports = {
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
    }
}