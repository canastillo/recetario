const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
        ingredient: { import: './src/js/ingredient.js', dependOn: 'loadingbar' },
        recipes: { import: './src/js/recipes.js', dependOn: 'loadingbar' },
        loadingbar: './src/js/loadingBar.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
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
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            filename: 'recipes.html',
            template: './src/recipes.html',
            chunks: ['main', 'recipes', 'loadingbar']
        }),
        new HtmlWebpackPlugin({
            filename: 'country.html',
            template: './src/country.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredients.html',
            template: './src/ingredients.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'recipe.html',
            template: './src/recipe.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredient.html',
            template: './src/ingredient.html',
            chunks: ['main', 'ingredient', 'loadingbar']
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
}

