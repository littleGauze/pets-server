'use strict'

module.exports = _ => { // eslint-disable-line
  return async (ctx, next) => {
    await next()

    const data = ctx.body
    if (data.error) return data

    ctx.body = {
      status: ctx.status,
      data
    }
  }
}
