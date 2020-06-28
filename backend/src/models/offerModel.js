import mongoose from 'mongoose'

const Schema = mongoose.Schema

const offerSchema = new Schema({
  job_title: {
    type: String
  },
  createdAt: {
    type: String, default: new Date()
  },
  company_name: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    locality: {
      type: String
    },
    dep_code: {
      type: String
    }
  }
})

export const Offer = mongoose.model('offer', offerSchema)
