import React, { useState, Fragment } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import useSWR from 'swr'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { classNames } from '@/lib/classNames'

const secondaryNavigation = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

export default function Forum() {
  const [categorySelect, setCategorySelect] = useState(
    'Những điều cần biết về trường',
  )

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR('/api/forum', fetcher)
  const stats = [
    { name: 'Số bài đăng', value: data?.length },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' },
    { name: 'Success rate', value: '98.5%' },
  ]
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/forum/${id}`, {
        method: 'DELETE',
      })
      toast('Đã xóa bài đăng này!', {
        icon: '👋',
      })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {' '}
      <main>
        <header>
          <nav className="flex overflow-x-auto border-b border-white/10 py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={item.current ? 'text-indigo-400' : ''}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Heading */}
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 dark:bg-gray-700/10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <div className="flex items-center gap-x-3">
                <div className="flex-none rounded-full p-1 text-green-400 dark:bg-green-400/10">
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h1 className="flex gap-x-3 text-base leading-7">
                  <span className="font-semibold dark:text-white">Forum</span>
                  <span className="text-gray-600">/</span>
                  <span className="font-semibold dark:text-white">
                    mobile-api
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 dark:bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, statIdx) => (
              <div
                key={stat.name}
                className={classNames(
                  statIdx % 2 === 1
                    ? 'sm:border-l'
                    : statIdx === 2
                    ? 'lg:border-l'
                    : '',
                  'border-t px-4 py-6 dark:border-white/5 sm:px-6 lg:px-8',
                )}
              >
                <p className="text-sm font-medium leading-6 text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight dark:text-white">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="text-sm dark:text-gray-400">
                      {stat.unit}
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* Activity list */}
        <div className="border-t pt-11 dark:border-white/10">
          <h2 className="px-4 text-base font-semibold leading-7 dark:text-white sm:px-6 lg:px-8">
            Quản lý bài đăng
          </h2>
          <table className="mt-6 w-full whitespace-nowrap text-left">
            <colgroup>
              <col className="lg:w-6/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="border-b border-white/10 text-sm leading-6 dark:text-white">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                >
                  Người đăng
                </th>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                >
                  Nội dung
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left "
                >
                  Lượt thích
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left "
                >
                  Bình luận
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                >
                  Ngày đăng
                </th>

                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                >
                  Chỉnh sửa
                </th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-white/5">
              {data
                ?.slice()
                .reverse()
                .map((item) => (
                  <tr key={item.commit}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={item.authorAvatar}
                          alt=""
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <Link
                          href={`/categories/post/${item._id}`}
                          className="truncate text-sm font-medium leading-6 dark:text-white"
                        >
                          {item.author}
                        </Link>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-800 dark:text-white">
                          {item.content}
                        </span>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-800 dark:text-white">
                          {item.react.length}
                        </span>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-800 dark:text-white">
                          {item.comment.length}
                        </span>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                          {item.datetime}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 pl-2  text-sm leading-6 ">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <div className="flex flex-none items-center gap-x-4">
                          <Menu as="div" className="relative flex-none">
                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                              <span className="sr-only">Open options</span>

                              <a
                                href="#"
                                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                              >
                                Actions
                              </a>
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item className="cursor-pointer hover:bg-gray-100">
                                  {({ active }) => (
                                    <div
                                      className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900',
                                      )}
                                    >
                                      <span className="inline ">
                                        <PencilSquareIcon className="inline h-6 pr-1 text-blue-500" />
                                        Edit
                                      </span>
                                    </div>
                                  )}
                                </Menu.Item>

                                <Menu.Item className="cursor-pointer hover:bg-gray-100">
                                  {({ active }) => (
                                    <div
                                      className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900',
                                      )}
                                      onClick={() => handleDelete(item._id)}
                                    >
                                      <TrashIcon className="inline h-6 pr-1 text-red-500" />
                                      Delete
                                    </div>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
