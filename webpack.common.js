const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
    // エントリーポイント
    entry: {
        app: './src/js/index.js',
        // another: './src/js/another.js',
    },
    output: {
        path: path.resolve(__dirname, 'build/assets/js'),
        filename: 'main.js',
    },
    devtool: 'source-map',
    // ローダーの設定
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

    ],
    optimization: {

    },
};
