const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'recipes.html',
            template: './src/recipes.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'country.html',
            template: './src/country.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredients.html',
            template: './src/ingredients.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'recipe.html',
            template: './src/recipe.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredient.html',
            template: './src/ingredient.html'
        }),
    ],
    module: {
        rules: [
            { test: /\.css$/,
            exclude: /node_modules/,
             use: ['style-loader', 'css-loader'] },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
    ]
  },
    devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}

