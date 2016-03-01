var webpack = require('webpack')

module.exports = {
  entry: './index.tsx',

  output: {
    filename: 'bundle.js',
    path: 'public'
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  },
  
  resolve: {
    // .js is required for react imports.
    // .tsx is for our app entry point.
    // .ts is optional, in case you will be importing any regular ts files.
    extensions: ['', '.js', '.ts', '.tsx']
  },  
  
//   plugins: process.env.NODE_ENV === 'production' ? [
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin()
//   ] : [],
}