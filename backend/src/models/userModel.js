import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String
  }

})

export const User = mongoose.model('user', userSchema)
