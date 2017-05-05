// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const webpack = require('webpack');
//https://www.npmjs.com/package/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
//https://www.npmjs.com/package/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//webpack插件，用于清除目录文件
const CleanPlugin = require('clean-webpack-plugin');

// Create multiple instances 
// const extractCSS = new ExtractTextPlugin('./css/[name].css');
// const extractLESS = new ExtractTextPlugin('./css/[name].less.css');

module.exports = {
    // devtool: 'eval-source-map', //开启sourceMap便于调试
    entry: './src/main.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 指定打包之后的文件夹
        // publicPath: '/assets/', //指定资源文件引用的目录
        // filename: 'bundle.js' // 指定打包为一个文件 bundle.js
        filename: './js/[name].js', // 可以打包为多个文件
        // publicPath: "/assets/",
        library: "daosen",
        libraryTarget: "umd",
        // chunkFilename: "[id].js",
        // sourceMapFilename: "sourcemaps/[file].map"
    },
    // 使用loader模块
    module: {
        /* 在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，同时链式loader(用!连接)只适用于module.loader
        同时-loader不可省略 */
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [{
                    loader: 'css-loader',
                    options: {
                        // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                    }
                }, {
                    loader: 'postcss-loader',
                    // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }]
            }),
            exclude: /node_modules/ //需要排除的目录
        },{
            test: /\.less?$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [{
                    loader: 'css-loader',
                    options: {
                        // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                    }
                }, {
                    loader: 'postcss-loader',
                    // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                },'less-loader']
            }),
             // exclude: /node_modules/ //需要排除的目录
        },{
            test: /\.(js|es6)$/,
            loader: 'babel-loader?presets[]=es2015', //此处不能用use
            // exclude: /node_modules/ //需要排除的目录
        },{
            //     test: /\.(png|jpg)$/,//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            //     loader: 'url-loader?limit=8192',
            //     // exclude: /node_modules/ //需要排除的目录
            // },{
            //       test: /\.(jpe?g|png|gif|svg)$/i,
            //       use: [
            //         'url-loader?limit=10000',
            //         'img-loader'
            //       ]
            //正则匹配后缀.png、.jpg、.gif图片文件;
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [{
                 //加载url-loader 同时安装 file-loader;
                 loader : 'url-loader',
                 options : {
                     //小于10000K的图片文件转base64到css里,当然css文件体积更大;
                     limit : 10000,
                     //设置最终img路径;
                     name : './images/[name]-[hash].[ext]'
                 }
             },
             {
                 //压缩图片(另一个压缩图片：image-webpack-loader);
                 loader : 'img-loader?minimize&optimizationLevel=5&progressive=true'
             }]
        },{
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            // exclude: /node_modules/ //需要排除的目录
            // },{
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     query: {
            //       limit: 10000,
            //       name: './images/[name].[hash:7].[ext]'
            //     }
            // },{
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     query: {
            //       limit: 10000,
            //       name:'./css/fonts/[name].[hash:7].[ext]'
            //     }
        },{
            test: /\.json$/,
            use: 'json-loader',
            // exclude: /node_modules/ //需要排除的目录
        },{
            test: /\.(txt|html)$/,
            use: 'raw-loader',
            // exclude: /node_modules/ //需要排除的目录
        }]
    },
    // 配置devServer各种参数
    devServer: {
        contentBase: path.join(__dirname,'dist'),  //设置启动文件目录;
        port: 9999,      //设置端口号；
        hot: true, // 配置HMR之后可以选择开启
       // historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // 模版文件
        }),
        new CleanPlugin(['build']),
        new webpack.optimize.CommonsChunkPlugin('common.js'),//提取公共代码
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),//压缩
        new webpack.HotModuleReplacementPlugin(), // 热加载插件
        new ExtractTextPlugin("./css/[name].css")
        // new ExtractTextPlugin("./css/[name].[hash].css") 
    ]
}