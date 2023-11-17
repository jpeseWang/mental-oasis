import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
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

    // comment: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     id: {
    //       type: String,
    //     },
    //     avatar: {
    //       type: String,
    //     },
    //     content: {
    //       type: String,
    //     },
    //     date: {
    //       type: String,
    //     },
    //   },
    //   { timestamps: true },
    // ],
  },
  { timestamps: true },
)

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model('Post', postSchema)
