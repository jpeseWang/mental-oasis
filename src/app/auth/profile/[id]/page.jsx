/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { formatTimeStamp } from '@/lib/formatTimestamp'
import LoadingE from '@/components/Loading/LoadingE'
import ViewForumModal from '@/app/forum/Modal/ViewForum'
import './profile.css'
import Link from 'next/link'

export default function Forum({ params }) {
  const session = useSession()
  const router = useRouter()
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false)
  const [viewModalParams, setViewModalParams] = useState('')

  function closeModal() {
    setViewModalIsOpen(false)
    setViewModalIsOpen(false)
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, mutate, error, isLoading } = useSWR(
    `/api/auth/user/${params.id}`,
    fetcher,
  )
  const { data: postData } = useSWR(`/api/forum`, fetcher)
  console.log('id >>', data?._id)
  if (session.status === 'loading') {
    return <LoadingE />
  }
  if (session.status === 'unauthenticated') {
    router?.push('/auth/login')
  }
  if (session.status === 'authenticated') {
    return (
      <div>
        {isLoading ? (
          <LoadingE />
        ) : (
          <main className="mt-6 h-screen bg-opacity-25">
            <div className="mb-8 lg:mx-auto lg:w-8/12">
              <header className="mx-auto flex flex-wrap items-center p-4 md:py-8">
                <div className="md:ml-16 md:w-3/12">
                  <img
                    className="h-20 w-20 rounded-full border-2 border-pink-600 object-cover
                   p-1 md:h-40 md:w-40"
                    src={data.avatar}
                    alt="profile"
                  />
                </div>

                <div className="ml-4 w-8/12 md:w-7/12">
                  <div className="mb-4 md:flex md:flex-wrap md:items-center">
                    <h2 className="mb-2 inline-block text-3xl font-light sm:mb-0 md:mr-2">
                      {data?.fullname}
                    </h2>

                    <span
                      className="fas fa-certificate fa-lg relative mr-6 
                             inline-block -translate-y-2 transform text-xl text-blue-500"
                      aria-hidden="true"
                    >
                      <i
                        className="fas fa-check absolute inset-x-0 ml-1 mt-px
                             text-xs text-white"
                      ></i>
                    </span>

                    <a
                      href="#"
                      className="block block rounded 
                      bg-blue-500 px-2 py-1 text-center text-sm font-semibold 
                      text-white sm:inline-block"
                    >
                      Follow
                    </a>
                  </div>

                  <ul className="mb-screen mb-4 hidden space-x-8 md:flex">
                    <li>
                      <span className="font-semibold">
                        {' '}
                        {
                          postData?.filter((p) => p.authorID === data._id)
                            .length
                        }
                      </span>
                      {` `}
                      posts
                    </li>

                    <li>
                      <span className="font-semibold">989</span> {` `}
                      followers
                    </li>
                    <li>
                      <span className="font-semibold">345</span> {` `}
                      following
                    </li>
                  </ul>

                  <div className="hidden md:block">
                    <h1 className="font-semibold">{data.dob}</h1>

                    <p>Another Fine Day Ruined By Responsibilities</p>
                  </div>
                </div>

                <div className="my-2 text-sm md:hidden">
                  <h1 className="font-semibold">Mr Travlerrr...</h1>

                  <p>LAnother Fine Day Ruined By Responsibilities</p>
                </div>
              </header>

              <div className="px-px md:px-3 ">
                <ul
                  className="mt-4 flex justify-around space-x-8 border-t 
              p-2 text-center text-sm leading-snug text-gray-600 md:hidden"
                >
                  <li>
                    <span className="block font-semibold text-gray-800">
                      {postData?.filter((p) => p.authorID === data._id).length}
                    </span>
                    posts
                  </li>

                  <li>
                    <span className="block font-semibold text-gray-800">
                      40.5k
                    </span>
                    followers
                  </li>
                  <li>
                    <span className="block font-semibold text-gray-800">
                      302
                    </span>
                    following
                  </li>
                </ul>

                <ul
                  className="mt-9 flex items-center justify-around space-x-12  
                  border-t text-xs font-semibold uppercase tracking-widest
                  text-gray-600 md:justify-center"
                >
                  <li className="md:-mt-px md:border-t md:border-gray-700 md:text-gray-700">
                    <a className="inline-block p-3" href="#">
                      <i className="fas fa-th-large text-xl md:text-xs"></i>
                      <span className="hidden md:inline">post</span>
                    </a>
                  </li>
                  <li>
                    <a className="inline-block p-3" href="#">
                      <i className="far fa-square text-xl md:text-xs"></i>
                      <span className="hidden md:inline">igtv</span>
                    </a>
                  </li>
                  {/* <li>
                    <a className="inline-block p-3" href="#">
                      ico
                      <span className="hidden md:inline">tagged</span>
                    </a>
                  </li> */}
                </ul>

                <div className="container ">
                  <div className="gallery">
                    {postData
                      ?.filter((p) => p.authorID === data._id)
                      .slice()
                      .reverse()
                      .map((post, index) => (
                        <div
                          className="gallery-item"
                          tabIndex="0"
                          key={index}
                          onClick={() => {
                            setViewModalParams(post._id)
                            setViewModalIsOpen(true)
                          }}
                        >
                          <div>
                            <img
                              src={post.imgSrc}
                              className="gallery-image"
                              alt=""
                            />
                            <div className="gallery-item-info">
                              <ul>
                                <li className="gallery-item-likes text-sm">
                                  <span className="visually-hidden text-sm">
                                    Likes:
                                  </span>
                                  <HeartIcon className="inline h-6 w-6 pb-1" />
                                  {post.react.length}
                                </li>
                                <li className="gallery-item-comments text-sm">
                                  <span className="visually-hidden">
                                    Comments:
                                  </span>
                                  <ChatBubbleOvalLeftIcon className="inline h-6 w-6 pb-1" />{' '}
                                  {post.comment.length}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {viewModalIsOpen && (
              <ViewForumModal
                isOpen={viewModalIsOpen}
                onClose={closeModal}
                reload={mutate}
                params={viewModalParams}
              />
            )}
          </main>
        )}
      </div>
    )
  }
}
