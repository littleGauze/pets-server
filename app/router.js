'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // user
  router.get('/user', controller.user.index)
  router.post('/user', controller.user.create)
  router.put('/user/:id', controller.user.update)
  router.post('/user/login', controller.user.login)
  router.get('/user/logout', controller.user.logout)
}
