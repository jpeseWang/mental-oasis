import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import Forum from '@/models/Forum'

export const GET = async (request, { params }) => {
  const { id } = params

  try {
    await connect()

    const post = await Forum.findById(id)

    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  const { id } = params

  try {
    await connect()

    await Forum.findByIdAndDelete(id)

    return new NextResponse('Post has been deleted', { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (request, { params }) => {
  const { id } = params
  const newComment = await request.json()

  try {
    await connect()
    const post = await Forum.findByIdAndUpdate(id)
    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    post.comment = post.comment.concat(newComment)

    await post.save()

    return new NextResponse('Post has been updated', { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
