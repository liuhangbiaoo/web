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
    $ touch webpack.production.config.js //生产环境

```

### 一键安装手续工具包

```
#安装所需工具

#其中npm i -D相当于 npm install --save-dev  局部安装并自动配置package.json

$ npm i -D webpack webpack-dev-server html-webpack-plugin babel-core babel-loader babel-preset-es2015 css-loader style-loader less-loader  postcss-loader less autoprefixer extract-text-webpack-plugin url-loader img-loader file-loader json-loader raw-loader

```

### webpack基本工具

    . webpack：打包基础工具
    . webpack-dev-server:webpack开发服务
    . html-webpack-plugin:基于webpack的html新建或其它插件

### webpack之loader相关工具

*** loaders之预处理(本例用less,sass可以删除) ***

    . css-loader 处理css中路径引用等问题
    . style-loader 动态把样式写入css
    . less-loader less加载
    . postcss-loader css再处理
    . autoprefixer 自动增加前缀
    . less less编译
    . extract-text-webpack-plugin：独立css,link方式 
    . node-sass sass编译
    . sass-loader scss加载


    $ npm install --save-dev css-loader style-loader less-loader postcss-loader less autoprefixer extract-text-webpack-plugin

    eg:
       {
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
             exclude: /node_modules/ //需要排除的目录
        }

*** loaders之js处理 （本例无jsx-loader）***

    . babel-core:ES6核心包
    . babel-loader:基于webpack的ES6加载插件
    . babel-preset-es2015:把ES6转换成ES5
    . jsx-loader:支持jsx语法(或react)

    $ npm install --save-dev babel-core babel-preset-es2015 babel-loader jsx-loader

    eg:
       {
         test: /\.(js|es6)$/,
         loader: 'babel-loader?presets[]=es2015', //此处不能用use
         exclude: /node_modules/ //需要排除的目录
       }

*** loaders之图片处理 ***

    . url-loader:图片文件使用 url-loader 来处理，小于8kb的直接转为base64
    . img-loader:处理图片
     $ npm install --save-dev url-loader img-loader

            // require("url-loader?limit=10000!./file.png");
            // // => data URL if "file.png" is smaller than 10kb
            // require("url-loader?mimetype=image/png!./file.png");
            // // => Specify mimetype for the file (Otherwise it's inferred from extension.)
            // require("url-loader?prefix=img/!./file.png");
            // // => Parameters for the file-loader are valid too
            // //    They are passed to the file-loader if used.
     eg:
     {
         test: /\.(png|jpg)$/,//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        loader: 'url-loader?limit=8192',
        exclude: /node_modules/ //需要排除的目录
     },{
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'url-loader?limit=10000',
            'img-loader'
          ]
     }


*** loaders之文件处理 ***

    . file-loader:文件处理

     $ npm install --save-dev file-loader

        require("file-loader?name=js/[hash].script.[ext]!./javascript.js");
        // => js/0dcbbaa701328a3c262cfd45869e351f.script.js
        require("file-loader?name=html-[hash:6].html!./page.html");
        // => html-109fa8.html
        require("file-loader?name=[hash]!./flash.txt");
        // => c31e9820c001c9c4a86bce33ce43b679
        require("file-loader?name=[sha512:hash:base64:7].[ext]!./image.png");
        // => gdyb21L.png
        // use sha512 hash instead of md5 and with only 7 chars of base64
        require("file-loader?name=img-[sha512:hash:base64:7].[ext]!./image.jpg");
        // => img-VqzT5ZC.jpg
        // use custom name, sha512 hash instead of md5 and with only 7 chars of base64
        require("file-loader?name=picture.png!./myself.png");
        // => picture.png
        require("file-loader?name=[path][name].[ext]?[hash]!./dir/file.png")
        // => dir/file.png?e43b20c069c4a01867c31e98cbce33c9
     eg:
     {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            exclude: /node_modules/ //需要排除的目录
     }

*** loaders之JSON处理 ***

    . json-loader:JSON处理

     $ npm install --save-dev json-loader


     var json = require("json!./file.json");
    // => returns file.json content as json parsed object 

     eg:
     {
            test: /\.json$/,
            use: 'json-loader'
            exclude: /node_modules/ //需要排除的目录
     }

*** loaders之html处理 ***

    . raw-loader:html处理

     $ npm install --save-dev raw-loader

         var fileContent = require("raw!./file.txt");
        // => returns file.txt content as string 
     eg:
     {
            test: /\.(txt|html)$/,
            use: 'raw-loader',
            exclude: /node_modules/ //需要排除的目录
     }