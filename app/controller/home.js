'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    if (!ctx.session.userId) {
      const userInfo = {
        userId: '12345',
        name: 'nealli'
      }
      ctx.session.userinfo = userInfo
    }
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController
