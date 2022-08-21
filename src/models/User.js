/**
 * Mongoose user model.
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const User = mongoose.model('User', schema)
