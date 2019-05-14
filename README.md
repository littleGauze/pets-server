# pets-server



该项目主要为 [pets](https://github.com/littleGauze/pets) 项目提供restFul api。也是一个简单的egg项目，用户验证使用egg-session + egg-session-redis, 还有一个简单的mongdb表，适合新手参考学习。

## 数据表
 很简单只有一个用户表，用来记录用户的基本信息。
 
 **Users**
 
|字段|类型|描述|
|:--|:--|:--|
|_id|String|使用shortid模块generate方法生成id|
|nickName|String|用户昵称|
|userName|String|用户名|
|password|String|密码(保存前端经过sha1 hash的字符串)|
|prefer|enum[String]|用户偏好，可选【cat, dog】
|bio|String|个人描述|

## 接口
|路由|方法|描述|
|:-|:-|:-|
|`/user/login `|POST|登录|
|`/user/logout `|GET|登出|
|`/user `|POST|注册|
|`/user`|GET|获取用户信息|
|`/user/:id`|PUT|修改用户信息|

## 注意
修改配置文件中的，mongdb和redis地址，以及前端跨域访问的域名白名单：
> config/config.default.js
```js
'use strict'

const defaults = {
  REDIS_HOST: '127.0.0.1',
  REDIS_PASSWORD: '',
  MONGO_URL: 'mongodb://root:xxx@localhost/pets', // repalce with your password
  WHITE_LIST: [ 'http://localhost:8080' ]
}

const env = process.env
const conf = {}
if (env.NODE_ENV === 'production') {
  conf.REDIS_HOST = env.REDIS_HOST
  conf.REDIS_PASSWORD = env.REDIS_PASSWORD
  conf.MONGO_URL = env.MONGO_URL
  conf.WHITE_LIST = JSON.parse(env.WHITE_LIST)
}

```
或者通过环境变量传入配置信息

see [egg docs](https://eggjs.org/) for more detail.
