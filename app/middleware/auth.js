'use strict'

const boom = require('@hapi/boom')

module.exports = _ => { // eslint-disable-line
  return async (ctx, next) => {
    if (!ctx.session.user) {
      throw boom.unauthorized('you must login first')
    }
    await next()
  }
}
