import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
} , 
{ timestamps: true })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)