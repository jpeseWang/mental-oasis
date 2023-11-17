import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import Forum from '@/models/Forum'

export const DELETE = async (request, { params }) => {
  const { postID, cmtID } = params //
  const cmtID2 = await request.json()

  try {
    await connect()

    const post = await Forum.findById(postID)

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    const commentIndex = post.comment.findIndex(
      (comment) => comment._id === cmtID2,
    )
    if (commentIndex === -1) {
      return new NextResponse('Comment not found', { status: 404 })
    }

    post.comments.splice(commentIndex, 1)

    await post.save()

    return new NextResponse('Comment has been deleted', { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (request, { params }) => {
  const { id } = params
  const newComment = await request.json()

  try {
    await connect()
    const post = await Forum.findById(id)

    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    post.comment = post.comment.concat(newComment)

    await post.save()

    return new NextResponse('Comment has been updated', { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
