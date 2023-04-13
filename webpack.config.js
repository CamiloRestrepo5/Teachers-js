// sirve para identificar la ruta de donde se encuentra este archivo
const path = require('path');

// me permite trabajar con documentos Html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extraer el codigo Css, minificarlo y optimizarlo. Ademas lo agrega como parte del head
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// nos permite copiar archivos de una ruta a otra 
const CopyWebpackPlugin = require('copy-webpack-plugin');

// creamos una funcion de flecha
module.exports = (env, argv) => {

    const isProduction = argv.mode === 'production';

    // para el servidor:
    return {
        entry: {
            index: './src/index.js',
            styles: './src/styles.js'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [

                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'

                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/assets/js'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunks: ['index', 'styles']
            }),
            ...(isProduction ? [ new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css'})] : [])
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    };

}