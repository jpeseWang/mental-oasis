import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model('User', userSchema)
