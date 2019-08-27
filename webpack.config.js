var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// const VENDOR_LIBS = [
//      'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'
// ];

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router'
];

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {      
    bundle: ['@babel/polyfill', './src/index.js'],// 'webpack-hot-middleware/client'],
    vendor: VENDOR_LIBS
  },    
  devtool:'inline-source-map',
  mode: 'development', 
  devServer:{
    contentBase: './public',
    //historyApiFallback: true,
    hot: true
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),    
    publicPath: 'http://localhost:9002/'//do research on best practice here
    
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        }),
        test: /\.s?css$/
      },
      {
        use: [          
          'file-loader?name=[name].[ext]',
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
      },
      {
        use:'svg-react-loader',
        test: /\.svg$/,
        exclude: /node_modules/
      }

    ]
  },
  plugins: [      
      new webpack.optimize.OccurrenceOrderPlugin(),
      //new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template:'./index.html'
      }),
      new ExtractTextPlugin('style.css')
  ]
};