# 博客前端

### 开发环境准备

- node.js安装
- vue、vue-cli安装
- WebStore：JavaScript IDE 开发前端项目

### 搭建 Vue 开发环境: node.js安装+vue、vue-cli安装

1. 官网下载安装node.js

2. 修改默认安装模块的路径

   ```shell
   npm config set prefix "D:\soft\nodejs\node_global" # 全局模块
   npm config set cache "D:\soft\nodejs\node_cache" # 缓存模块
   ```

3. 配置环境变量 

   - 系统变量：

   `NODE_PATH`：`D:\software\IT\nodejs\node_global\node_modules`

   `Path`:`D:\software\IT\nodejs\`

   `Path`:`D:\software\IT\nodejs\node_global`  

   确保vue.cmd所在的路径在系统变量中，否则会找不到vue命令

   - 用户变量：

   `Path`:`D:\software\IT\nodejs\node_global`

4. 安装vue，下载最新的Vue CLI，4.0版本以上才有`vue ui`命令

   ```shell
   npm install -g vue
   npm install -g @vue/cli  # 全局安装最新版vue-cli
   # 版本不对要先卸载
   npm uninstall vue-cli -g
   ```

5. 查看Vue版本

   ```shell
   vue -V
   ```

### 用Vue UI新建项目

1. 打开Vue UI可视化界面

   ```shell
   vue ui
   ```

2. 选择项目路径，文件夹

3. 选择一套预设，手动配置项目

   - 勾上Router、Vuex
   - 去掉Linter/Formatter代码校验

4. 勾上Use history mode for router

5. 等待创建完成

6. 用WebStore IDE打开项目

7. 命令行启动Vue

   ```shell
   npm run serve
   ```

### Vue项目结构

- `/src/App.vue`:主界面，只有一个
- `/src/views`：子界面
- `/src/router/index.js`：配路由

### Vue集成Element UI

1. 用Vue UI新建项目

2. 安装Element插件，默认设置

   ![image-20201025133321591](E:\VueProjects\blog-app\README.assets\image-20201025133321591.png)

3. 用WebStore打开项目，`npm run serve`运行项目

   ![image-20201025133340727](E:\VueProjects\blog-app\README.assets\image-20201025133340727.png)

### 博客前端项目Git仓库

1. clone https://github.com/huchenhui1/blog-vue.git
2. 用WebStore打开
3. 在项目根路径下命令行执行`npm install`，npm会根据`package.json`中对各种依赖的定义去安装依赖
4. 命令行执行`npm run dev`启动前端（或者配运行环境Edit Configurations）
5. 安装redis？设置都默认（原后台用了Redis存储Session，如在注册登录时）

### 项目结构说明

- `api`:API请求函数，在每个vue中使用
- `assets`：图片等资源文件
- `components`：vue组件，用于组成vue页面
  - `article`：文章卡片，用在ArticleScrollPage.vue组件中
  - `card`：首页的博主信息最热文章、最新文章、最热标签，文档归档等卡片，用在首页Index.vue页面
  - `comment`：评论组件，用在BlogView.vue浏览文章页面
  - `gotop`：Backtop回到顶部按钮
  - `markdown`：文章编辑组件
  - `scrollpage`：首页显示文章列表的组件
  - `BaseFooter.vue`：footer栏组件
- `request`：request拦截器和respone拦截器
- `router`：配路由，home.vue中的`<router-view>`根据`router/index.js`加载页面，全局前置守卫
- `store`：存储全局用的数据
- `utils`：工具js函数
- `view`：vue页面
  - `blog`
    - BlogAllCategoryTag.vue
    - BlogArchive.vue
    - BlogView.vue：浏览文章页面
    - BlogWrite.vue：编辑文章页面
  - `common`
    - ArticleScrollPage.vue：显示文章列表，用在首页、按类别查看、按标签查看等页面
  - BaseHeader.vue：header组件
  - Index.vue：首页
  - Login.vue：登陆页面
  - Register.vue：注册页面
- App.vue
- home.vue：Vue应用 由header栏、footer栏和主体页面组成

### Vue组件组织关系

以首页`http://localhost:8080/#//`为例

![image-20201025133409216](E:\VueProjects\blog-app\README.assets\image-20201025133409216.png)

### Vue文件

### 每次访问页面发生的事情，几个JS文件的作用

