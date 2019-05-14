/* eslint valid-jsdoc: "off" */

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

const envs = Object.assign(defaults, conf)

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    security: {
      csrf: false
    },
    cors: {
      origin(ctx) {
        const origin = ctx.headers.origin
        return envs.WHITE_LIST.includes(origin) && origin
      },
      allowMethods: 'GET,HEAD,PUT,POST,OPTIONS',
      credentials: true
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555831326718_1182'

  // add your middleware config here
  config.middleware = [
    'senitizer',
    'errorHandler',
    'auth'
  ]

  config.auth = {
    ignore(ctx) {
      if (/\/user\/?/.test(ctx.path) && ctx.method === 'POST') return true
      return /\/user\/(login)/.test(ctx.path)
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.redis = {
    client: {
      port: 6379,
      host: envs.REDIS_HOST,
      password: envs.REDIS_PASSWORD,
      db: 0
    }
  }

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true
  }

  config.mongoose = {
    client: {
      url: envs.MONGO_URL,
      options: {}
    }
  }

  return {
    ...config,
    ...userConfig
  }
}
