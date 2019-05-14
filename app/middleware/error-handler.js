'use strict'
const boom = require('@hapi/boom')
const pick = require('lodash/pick')

module.exports = _ => { // eslint-disable-line
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (boom.isBoom(err)) {
        const { output: { statusCode, payload } } = err
        ctx.body = {
          status: statusCode,
          ...pick(payload, [ 'error', 'message' ])
        }
        return
      }

      if (err.isJoi) {
        ctx.body = {
          status: 400,
          error: 'Wrong Params',
          message: err.message
        }
        return
      }

      ctx.body = {
        status: 500,
        error: 'Internal Error',
        message: err.message
      }
    }
  }
}
