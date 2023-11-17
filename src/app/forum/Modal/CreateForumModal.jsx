'use client'

import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/solid'
import EmojiPicker from 'emoji-picker-react'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import '@/styles/model.css'
import {
  XMarkIcon,
  GlobeEuropeAfricaIcon,
  FaceSmileIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import LoadingE from '@/components/Loading/LoadingE'
export const customStyles = {
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
}
export default function CreateForumModal({ isOpen, onClose, reload }) {
  const [content, setContent] = useState('')
  const [previewImg, setPreviewImg] = useState()
  const [isError, setIsError] = useState(false)
  const [isOpenEmoji, setIsOpenEmoji] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  //Emoji
  const [selectedEmoji, setSelectedEmoji] = useState('1f60a')
  const [inputValue, setInputValue] = useState('')

  function onChangeEmoji(emojiData, event) {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
    )
    setSelectedEmoji(emojiData.unified)
  }

  let date = new Date().toUTCString().slice(5, 16)
  let datetime = new Date(date).toISOString().slice(0, 10)
  const session = useSession()
  const router = useRouter()

  if (session.status === 'unauthenticated') {
    router?.push('/auth/login')
  }

  const handlePreviewImage = (e) => {
    const selectedFile = e.target.files[0]
    selectedFile.preview = URL.createObjectURL(selectedFile)
    setPreviewImg(selectedFile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', previewImg)
    formData.append('upload_preset', 'CategoryPost')
    setUploading(true)

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dcebbdzlq/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      )

      const data = await response.json()

      await fetch('/api/forum', {
        method: 'POST',
        body: JSON.stringify({
          content: inputValue,
          imgSrc: data.secure_url,
          date,
          datetime,
          author: session.data.fullname,
          authorAvatar: session.data.avatar,
          authorID: session.data.id,
        }),
      })

      reload()
      e.target.reset()
      setUploading(false)
      onClose()
      toast.success('Tạo bài viết thành công!')
    } catch (err) {
      console.log(err)
      setUploading(false)
      toast.error('Đã có lỗi xảy ra!')
    }
  }

  useEffect(() => {
    return () => {
      previewImg && URL.revokeObjectURL(previewImg.preview)
    }
  }, [previewImg])

  console.log(inputValue)
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div as="div" className="relative z-10" initialFocus={cancelButtonRef}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-black  sm:my-8 sm:w-full sm:max-w-lg">
              {uploading ? (
                <>
                  <LoadingE />
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className=" px-4 pb-4 pt-5  sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <h1
                            as="h3"
                            className="light:text-gray-900 text-lg font-semibold leading-6"
                          >
                            Tạo bài đăng
                          </h1>
                          <button onClick={() => onClose()}>
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>

                        <div className="mt-2">
                          <div className="flex items-center px-2 py-3">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={session.data.avatar}
                            />
                            <div className="ml-3 ">
                              <span className="block text-sm font-semibold leading-tight antialiased dark:text-white">
                                {session.data.fullname}
                              </span>
                              <span className="block text-xs text-gray-600">
                                <GlobeEuropeAfricaIcon className=" mb-1 inline h-4 w-4" />{' '}
                                Public
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Vui lòng không đăng tải những nội dung nhạy cảm, vi
                            phạm thuần phong mỹ tục, đạo đức xã hội!
                          </p>
                        </div>

                        <div className="col-span-full">
                          <div className="mt-4">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              placeholder="Bạn đang suy nghĩ điều gì nhỉ?"
                              className="light:bg-white block h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-300 sm:text-sm sm:leading-6"
                              defaultValue={''}
                              onChange={(e) => {
                                setInputValue(e.target.value)
                                console.log(inputValue)
                              }}
                              value={inputValue}
                            />
                          </div>
                          {previewImg ? (
                            <div>
                              <div className="rounded-md ring-1 ring-gray-300">
                                <img
                                  src={previewImg.preview}
                                  className="max-w-80 my-2 rounded-xl px-2 py-2 ring-1 "
                                />
                              </div>

                              <button
                                type="button"
                                className="my-4 inline rounded px-1.5 py-1.5 ring-1"
                                onClick={() => {
                                  URL.revokeObjectURL(previewImg.preview)
                                  setPreviewImg(null)
                                }}
                              >
                                {' '}
                                <TrashIcon className="right-3 top-3 z-50 inline h-6 w-6 cursor-pointer font-bold text-gray-500 hover:text-gray-800" />
                                <span className="text-sm leading-6 text-gray-600">
                                  Remove image
                                </span>
                              </button>
                            </div>
                          ) : (
                            <>
                              <span></span>
                            </>
                          )}
                          <div className=" flex gap-x-2">
                            <FaceSmileIcon
                              className="mt-2 inline h-6 w-6 cursor-pointer text-gray-500"
                              onClick={() => {
                                setIsOpenEmoji(!isOpenEmoji)
                              }}
                            />
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-semibold  focus-within:outline-none   hover:text-indigo-500"
                            >
                              <span>
                                <PhotoIcon
                                  className="mt-2 flex h-6 w-6 cursor-pointer text-gray-500"
                                  onChange={handlePreviewImage}
                                />
                              </span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handlePreviewImage}
                              />
                            </label>

                            <div className="absolute top-0 my-6 ml-10">
                              {isOpenEmoji && (
                                <EmojiPicker
                                  height={390}
                                  width={350}
                                  onEmojiClick={onChangeEmoji}
                                  autoFocusSearch={false}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="light:bg-gray-50 ml-4 px-4 py-3 sm:px-6">
                    <button
                      type="submit"
                      className="light:bg-black mb-2 w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 "
                    >
                      Đăng tải
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
