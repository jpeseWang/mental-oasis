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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="light:text-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
            Tự hào là học sinh Phan Châu Trinh!
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Học sinh trường THPT Phan Châu Trinh luôn tự hào khi được trải
            nghiệm một môi trường học đường đầy năng động và nhiệt huyết.
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {data
              ?.filter(
                (p) => p.category === 'Tự hào là học sinh Phan Châu Trinh!',
              )
              .map((post) => (
                <article
                  key={post.id}
                  className="mx-4 flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <Link
                      href={`/categories/post/${post._id}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Bài đăng
                    </Link>
                  </div>
                  <div className="group relative">
                    <h3 className="light:text-gray-900 mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                      <Link href={`/categories/post/${post._id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
