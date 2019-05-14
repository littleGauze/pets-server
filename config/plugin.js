'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  redis: {
    enable: true,
    package: 'egg-redis'
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis'
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },

  cors: {
    enable: true,
    package: 'egg-cors'
  }
}
