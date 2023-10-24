const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.html', // Your main HTML entry point
    output: {
        filename: 'bundle.js', // The name of the JavaScript output bundle
        path: path.resolve(__dirname, 'dist'), // The directory where the output bundle will be placed
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match JavaScript files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // Use Babel for transpilation if needed
                },
            },
            {
                test: /\.scss$/, // Match SCSS files
                use: ['style-loader', 'css-loader', 'sass-loader'], // Use appropriate loaders for styles
            },
            {
                test: /\.html$/, // Match HTML files
                use: 'html-loader', // Use html-loader to handle HTML files
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash].[ext]',
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', // Your HTML template
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'public'), // Serve your content from the 'public' directory
        compress: true,
        port: 9000,
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
        maxAssetSize: 300000, // Specify your asset size limit (in bytes)
        maxEntrypointSize: 300000, // Specify your entry point size limit (in bytes)
    },
};
