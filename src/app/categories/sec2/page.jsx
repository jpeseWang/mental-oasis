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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="light:text-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
            Truyền thống học tập theo tư tưởng “Chi bằng học&ldquo;
          </h2>
          <p className="light:text-gray-600 mt-2 text-lg leading-8">
            Trường THPT Phan Châu Trinh vốn nổi bật với thành tích dạy và học
            rực rỡ qua các năm học. Lấy kim chỉ nam là tư tưởng “Chi bằng học”
            của nhà chí sĩ Phan Châu Trinh, hãy cùng tìm hiểu xem thầy và trò
            trường ta đã nỗ lực giữ gìn và phát huy truyền thống này như thế nào
            nhé.
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {data
              ?.filter(
                (p) =>
                  p.category ===
                  'Truyền thống học tập theo tư tưởng Chi bằng học',
              )
              .map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      src={post.imgSrc}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.datetime}
                      </time>
                      <Link
                        href={`/categories/post/${post._id}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        Mới
                      </Link>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="light:text-gray-900 mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                        <Link href={`/categories/post/${post._id}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
