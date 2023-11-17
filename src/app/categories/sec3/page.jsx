'use client'
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import LoadingE from '@/components/Loading/LoadingE'
import coverImg from '../images/section_cover/shine.jpeg'
import Image from 'next/image'
export default function Example() {
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher)
  if (session.status === 'loading') {
    return <LoadingE />
  }
  return (
    <div className=" py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
              Hoạt động ngoại khoá - nơi phong trào thăng hoa
            </h2>
            <p className="light:text-gray-600 mt-6 text-xl leading-8">
              Bên cạnh thành tích dạy và học, trường THPT Phan Châu Trinh luôn
              xây dựng rất nhiều sân chơi ngoại khóa bổ ích để các bạn học sinh
              được trải nghiệm và phát triển các kỹ năng sống cần thiết.
            </p>
            <Image
              src={coverImg}
              alt=""
              className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            />
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="sr-only">Job openings</h3>
            <ul className="-my-8 divide-y divide-gray-100">
              {data
                ?.filter(
                  (p) =>
                    p.category ===
                    'Hoạt động ngoại khoá - nơi phong trào thăng hoa',
                )
                .map((opening) => (
                  <li key={opening.id} className="py-8">
                    <dl className="relative flex flex-wrap gap-x-3">
                      <dt className="sr-only">Role</dt>
                      <dd className="light:text-gray-900 w-full flex-none text-lg font-semibold tracking-tight">
                        <Link href={`/categories/post/${opening._id}`}>
                          {opening.title}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                        </Link>
                      </dd>
                      <dt className="sr-only">Description</dt>
                      <dd className="mt-2 w-full flex-none text-base leading-7 text-gray-600 dark:text-gray-300">
                        {opening.description}
                      </dd>

                      <dt className="sr-only">Location</dt>
                      <dd className="mt-4 flex items-center gap-x-3 text-base leading-7 text-gray-500">
                        <svg
                          viewBox="0 0 2 2"
                          className="h-0.5 w-0.5 flex-none fill-gray-300"
                          aria-hidden="true"
                        >
                          <circle cx={1} cy={1} r={1} />
                        </svg>
                        {opening.datetime}
                      </dd>
                    </dl>
                  </li>
                ))}
            </ul>
            <div className="mt-8 flex border-t border-gray-100 pt-8">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Xem thêm <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
