'use strict'

const omit = require('lodash/omit')
const boom = require('@hapi/boom')
const Service = require('egg').Service

class UserService extends Service {
  async create(userName, password) {
    const { ctx } = this

    let user
    try {
      user = await ctx.model.User.create({
        userName,
        password
      })
    } catch (err) {
      if (/duplicate key/.test(err.message)) {
        throw boom.conflict('username is in use')
      }
    }

    return omit(user.toObject(), [ 'password' ])
  }

  async update(id, data) {
    const { ctx } = this

    const { oldpwd, password, ...update } = data
    const user = await ctx.model.User.findById(id)
    if (!user) {
      throw boom.badRequest('user not found')
    }

    // user want to change password
    if (oldpwd) {
      // wrong old password
      if (user.password !== oldpwd) {
        throw boom.badRequest('password error')
      }
      update.password = password
    }

    const res = await ctx.model.User.findOneAndUpdate({ _id: id }, update, { new: true, select: { password: 0 } })

    // update redis cache
    ctx.session.user = res

    // password updated mark
    if (update.password) {
      res.password = true
    }
    return res
  }

  async checkUser(userName, password) {
    const user = await this.findUser(userName)

    // user not found
    if (!user) throw boom.notFound('user not found')

    if (user.password === password) return user

    throw boom.badRequest('password error')
  }

  async findUser(userName) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ userName })
    return user
  }
}

module.exports = UserService
