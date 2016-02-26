var fs = require('fs')
var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'server.jsx'),

    output: {
        filename: 'server.bundle.js'
    },

    target: 'node',

    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
        'react-dom/server'
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod
        return ext
    }, {}),

    node: {
        __filename: true,
        __dirname: true
    },

    resolve: {
        // .js is required for react imports.
        // .tsx is for our app entry point.
        // .ts is optional, in case you will be importing any regular ts files.
        extensions: ['', '.js', '.ts', '.tsx']
    },

    module: {
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }
        ]
    }
}