/**
 * Mongoose chat message model.
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const ChatMessage = mongoose.model('ChatMessage', schema)
