# exam-bbs

> this is a final exam

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8070
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

页面|url|注释
--|--|--
首页|/|
板块|/section/:id|展示当前板块的首页
帖子详情页|/post/:id|板块id为{section}的帖子id为{id}的帖子页面
当前用户自身详情页面|/user|
用户详情页面|/user/:id|id为{id}的用户对外展示页面

/oauth/token
header: Basic Auth (Username : bbs-fe , Password: bbs-fe)
body: form-data:
        grant_type: password
        username: 用户名
        password: 用户密码
