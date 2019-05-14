'use strict'
const shortid = require('shortid')

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    _id: { type: String, default: shortid.generate },
    nickName: String,
    userName: { type: String, required: true },
    password: { type: String, required: true },
    prefer: { type: String, enum: [ 'dog', 'cat' ], default: 'cat' },
    bio: String
  }, {
    versionKey: false,
    timestaps: true,
    toObject: {
      getters: true,
      virtuals: true
    },
    toJSON: {
      getters: true,
      virtuals: true
    }
  })

  UserSchema.index({ userName: 1 }, { unique: true })

  return mongoose.model('User', UserSchema)
}
