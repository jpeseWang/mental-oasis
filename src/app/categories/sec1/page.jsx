'use client'
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import LoadingE from '@/components/Loading/LoadingE'

export default function Example() {
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher)
  if (session.status === 'loading') {
    return <LoadingE />
  }
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Những điều cần biết về trường
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Chuyên mục nhằm cung cấp và cập nhật liên tục những thông tin liên
            quan đến trường: Lịch sử hình thành và phát triển, tiểu sử cụ Phan
            Châu Trinh, Nội quy nhà trường, cảnh quan trường, Sứ mệnh và mục
            tiêu phát triển.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data
            ?.filter((p) => p.category === 'Những điều cần biết về trường')
            .map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img
                  src={post.imgSrc}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <time dateTime={post.datetime} className="mr-8">
                    {post.date}
                  </time>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link href={`/categories/post/${post._id}`}>
                    <span className="absolute inset-0" />
                    {post.title.slice(0, 50)}
                  </Link>
                </h3>
              </article>
            ))}
        </div>
      </div>
    </div>
  )
}
