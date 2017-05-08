## 基于node构建的web前端自动化项目
    前提：必须先安装nedejs及npm(默认)(https://nodejs.org/)

### 使用技术

> 搭建平台：windows10+nodejs+cmder(命令行工具，自带的也可以)+sublime(编辑器，其他IDE也可行)+chrome(浏览器)+git等

>具体工具：webpack2.0(打包工具，类似gulp、grunt..)+less(编译成css)+babel(主要ES6 to ES5)

### 基本操作
```
    新建项目web(名称)

    $ md web

    进入web目录

    $ cd web

    新建package.json (项目基本配置)

    $ npm init

    新建(webpack)打包配置文件

    $ touch webpack.config.js   //开发环境
    $ touch webpack.production.config.js //生产环境（暂时不可以）

```

### 一键安装手续工具包

```
#安装所需工具

#其中npm i -D相当于 npm install --save-dev  局部安装并自动配置package.json

$ npm i -D  autoprefixer babel-core babel-loader babel-preset-es2015 clean-webpack-plugin css-loader extract-text-webpack-plugin file-loader handlebars handlebars-loader html-webpack-plugin html-withimg-loader json-loader less less-loader less-plugin-clean-css postcss-loader style-loader url-loader webpack webpack-dev-server

```

### webpack基本工具

    . webpack：打包基础工具
    . webpack-dev-server:webpack开发服务
    . html-webpack-plugin:基于webpack的html新建或其它插件

### webpack之loader相关工具
    . less编译
    . es6+bebel 编译
    . hbs模板预编译
    . 及其他打包
```
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
                                require('autoprefixer')({browsers:['last 2 versions']})
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
                                require('autoprefixer')({browsers:['last 2 versions']})
                            ];
                        }
                    }
                },{
                    loader: "less-loader", options: {
                        plugins: [
                            new CleanCSSPlugin({ advanced: true})
                        ]
                    }
                }],
                publicPath: '../'
            }),
        },{
            test: /\.(js|es6)$/,
            loader: 'babel-loader?presets[]=es2015', //此处不能用use
        },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                 //加载url-loader 同时安装 file-loader;
                 loader : 'url-loader',
                 options : {
                     //小于10000K的图片文件转base64到css里,当然css文件体积更大;
                     limit : 10000,
                     //设置最终img路径;
                     name : 'images/[name]-[hash:8].[ext]'
                 }
             }]
            // loader:'file-loader?name=[name].[ext]&publicPath=./&outputPath=build/images/'
            // loader: 'url-loader',
            // query: {
            //   limit: 10000,
            //   name: 'images/[name].[hash:7].[ext]'
            // }
        },{
            test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name:'fonts/[name].[hash:7].[ext]'
            }
        },{
            test: /\.json$/,
            use: 'json-loader'
        },{
            //https://github.com/pcardune/handlebars-loader/tree/master/examples
             test:/\.hbs$/,
             loader: "handlebars-loader"
        }
````