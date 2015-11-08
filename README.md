# web
道心的个人工作空间

1,安装nedejs及npm(默认)(https://nodejs.org/)

2,grunt 全局:npm install grunt -g  (创建Grunt项目中必须文件)

3,npm install -g grunt-cli/npm install -g grunt-init（当前目录/-g否则全局安装）
  
    a,创建package.json   $:npm init  (用于保存项目元数据)
    b，创建Gruntfile.js  $:grunt-init gruntfile (用于配置或定义任务、加载 Grunt 插件)
    git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile(3-b,必须依赖)

4,$:npm install grunt --save-dev
  npm安装package.json时  直接转到当前项目目录下用命令npm install 或npm install --save-dev安装即可，
  自动将package.json中的模块安装到node-modules文件夹下
  
5,安装griunt插件：
    npm install XXXX  --save-dev
    grunt:基于grunt
    load-grunt-tasks:加载所有的任务(省略runt.loadNpmTasks)
    grunt-contrib-connect:浏览器窗口打开
    grunt-contrib-watch:文件监听

方案2：
StaticPage 静态页面自动化工具
a, git clone https://github.com/foru17/StaticPage.git && cd StaticPage && sh go.sh

b,修改`package.json`、`Gruntfile.js`配置文件

c,npm install

d,开始项目（可参考：README.md文件）
