import mongoose from 'mongoose'

const { Schema } = mongoose

const forumSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
    },
    authorID: {
      type: String,
    },
    react: [
      {
        userID: {
          type: String,
        },
        userEmail: {
          type: String,
        },
      },
      { timestamps: true },
    ],
    comment: [
      {
        name: {
          type: String,
        },
        userID: {
          type: String,
        },
        avatar: {
          type: String,
        },
        content: {
          type: String,
        },
        date: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true },
)

//If the Post collection does not exist create a new one.
export default mongoose.models.Forum || mongoose.model('Forum', forumSchema)
