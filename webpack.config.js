const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
    //   title: 'Webpack App',
    //   filename: 'index.html',
      template: path.join(__dirname, './public/index.html')
    //   'src/template.html',
    })],
    devServer: {
        port: '3000',
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                },
            },
            },
            { 
                test: /\.tsx?$/, 
                loader: 'ts-loader' },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
      extensions: ['.*', '.js', '.jsx', '.ts', '.tsx'],
    },
}

