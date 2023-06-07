/**
 * Mongoose Session model.
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  sessionID: {
    type: String,
    unique: true,
    required: true
  },
  userID: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  connected: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const ChatSession = mongoose.model('ChatSession', schema)
