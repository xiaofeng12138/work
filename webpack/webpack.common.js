var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //配置html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//单独提取css模块
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //Css压缩模块
const  { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清理dist文件模块


module.exports = {
    entry:'./src/index.js', //入口文件
    resolve:{
      alias:{
        '@': path.resolve(__dirname, 'src/'), //配置绝对路径
      },
      extensions:['.js','.vue','.jsx','.json','.scss'] //引入外部文件可以省略后缀名
    },
    externals: {  //外部引入js
        jquery: 'jQuery'
     },
     module: {   //配置 css样式
        rules: [
          {
            test: /\.js$/, //es6转es5的模块
            exclude: /(node_modules|bower_components)/, // 加快编译速度，不包含node_modules文件夹内容
            use: {
              loader: 'babel-loader',
              options:{
                cacheDirectory:true
              }
            }
          },
          {
         test: /\.(png|svg|jpg|gif|jpeg|webp)$/, //图片处理
         use: [
           {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          },
           {
             loader: 'image-webpack-loader',  //先进行图片优化
             options: {
               mozjpeg: {
                 progressive: true,
                 quality: 65
               },
               optipng: {
                 enabled: false,
               },
               pngquant: {
                 quality: '65-90',
                 speed: 4
               },
               gifsicle: {
                 interlaced: false,
               },
               webp: {
                 quality: 75
               }
             }
          },
         ]
        },
     ]
  },
   plugins: [
     new HtmlWebpackPlugin({
      title: '晓风哥哥的webpack', // 默认值：Webpack App
      filename: 'main.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
    }),
     new CleanWebpackPlugin()
  ],
}