'use strict'

const joi = require('@hapi/joi')
const Controller = require('egg').Controller
const omit = require('lodash/omit')

class UserController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = ctx.session.user
  }

  async create() {
    const { ctx } = this

    joi.validate(ctx.request.body, joi.object({
      userName: joi.string(),
      password: joi.string()
    }), { presence: 'required' })

    const { userName, password } = ctx.request.body
    const user = await ctx.service.user.create(userName, password)
    ctx.body = user
  }

  async update() {
    const { ctx } = this

    joi.validate(ctx.params, { id: joi.string().required() })
    joi.validate(ctx.request.body, joi.object().keys({
      nickName: joi.string(),
      bio: joi.string(),
      prefer: joi.only([ 'cat', 'dog' ]).required(),
      oldpwd: joi.string(),
      password: joi.string()
    }).with('oldpwd', 'password'), { presence: 'optional' })

    const { id } = ctx.params
    const update = ctx.request.body
    const user = await ctx.service.user.update(id, update)
    ctx.body = user
  }

  async login() {
    const { ctx } = this
    joi.validate(ctx.request.body, joi.object({
      userName: joi.string(),
      password: joi.string()
    }), { presence: 'required' })
    const { userName, password } = ctx.request.body

    // check user
    const user = await ctx.service.user.checkUser(userName, password)

    // login success
    const userInfo = { ...omit(user.toObject(), [ 'password' ]) }
    ctx.session.user = userInfo
    ctx.body = userInfo
  }

  async logout() {
    const { ctx } = this

    ctx.session.user = null
    ctx.body = 'ok'
  }
}

module.exports = UserController
