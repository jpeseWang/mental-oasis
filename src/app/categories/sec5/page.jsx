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
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Văn hoá ứng xử trường THPT Phan Châu Trinh
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Giới thiệu chuyên mục: Văn hoá ứng xử luôn là truyền thống trường
            THPT Phan Châu Trinh chú trọng xây dựng và giữ gìn. Qua bao nhiêu
            năm tháng, văn hoá ứng xử cũng đã trở thành nét đặc trưng riêng đáng
            quý của các bạn học sinh trường ta.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data
            ?.filter(
              (p) =>
                p.category === 'Văn hoá ứng xử trường THPT Phan Châu Trinh',
            )
            .map((post) => (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <Link
                    href={`/categories/post/${post._id}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Mới
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6  group-hover:text-gray-600">
                    <Link href={`/categories/post/${post._id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  )
}
