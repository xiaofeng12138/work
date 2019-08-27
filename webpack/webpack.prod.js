var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //配置html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//单独提取css模块
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //Css压缩模块
const  { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清理dist文件模块

const merge = require('webpack-merge');
const common = require('./webpack.common')


let prodConfig = {
    entry:'./src/index.js', //入口文件
    mode:'production',  //开发环境
    output:{    //文件输出
        filename:'build.js',
        path:path.resolve(__dirname, 'dist')
    },
     module: {   //配置 css样式
        rules: [
        {
            test: /\.(sc|c|sa)ss$/,
            //use: ['style-loader', 'css-loader','sass-loader']
            use:[
                MiniCssExtractPlugin.loader, //加载css分离组件
                {
                    loader:'css-loader',
                    options:{
                         sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader', //添加浏览器css 前缀
                    options: {
                    ident: 'postcss',
                    sourceMap: true,
                    plugins: loader => [
                        require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
                    ]
                    }
                  },
                {
                    loader:'sass-loader',
                    options:{
                         sourceMap: true
                    }
                }
            ]
        }
     ]
  },
   plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 设置最终输出的文件名 样式提取出来后 需要在html文件中引入
      chunkFilename: '[id].css'
    }),
  ],
  optimization: {   //css压缩工具
    minimizer: [
     new OptimizeCSSAssetsPlugin({})
    ]
  }
}

module.exports  = merge(common,prodConfig) //合并公共和生产的配置文件 