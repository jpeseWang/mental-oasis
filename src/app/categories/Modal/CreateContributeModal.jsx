'use client'
import React, { useState, useRef, Fragment } from 'react'

import Modal from 'react-modal'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

import { XMarkIcon } from '@heroicons/react/24/outline'
import LoadingE from '@/components/Loading/LoadingE'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
export const customStyles = {
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
}
export default function CreateContributeModal({ isOpen, onClose }) {
  const [uploading, setUploading] = useState(false)
  const cancelButtonRef = useRef(null)
  const form = useRef()

  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    await emailjs
      .sendForm(
        'service_u2abmk7',
        'template_qqxe26k',
        form.current,
        'ZVPcFcyh2dGWZShlU',
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        },
      )
    e.target.reset()
    setInputValue('')
    setUploading(false)
    onClose()
    toast.success('Góp ý của bạn đã được gửi!')
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div as="div" className="relative z-10" initialFocus={cancelButtonRef}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-black  sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={handleSubmit} ref={form}>
                <div className=" px-4 pb-4 pt-5  sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="flex justify-between">
                        <h1
                          as="h3"
                          className="light:text-gray-900 text-lg font-semibold leading-6"
                        >
                          Hòm thư góp ý
                        </h1>
                        <button onClick={() => onClose()}>
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Vui lòng không đăng tải những nội dung nhạy cảm, vi
                          phạm thuần phong mỹ tục, đạo đức xã hội!
                        </p>
                      </div>

                      <div className="col-span-full mt-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                        >
                          Họ và tên (Không bắt buộc)
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                            <input
                              type="text"
                              name="name"
                              id="title"
                              className="block w-full flex-1 border-0 bg-transparent px-1.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full my-6">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                        >
                          Lớp (Không bắt buộc)
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                            <input
                              type="text"
                              name="class"
                              id="title"
                              className="block w-full flex-1 border-0 bg-transparent px-1.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="mt-4">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                          >
                            Nội dung
                          </label>
                          <textarea
                            id="description"
                            name="message"
                            rows={3}
                            className="light:bg-white block h-36 w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-300 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            onChange={(e) => {
                              setInputValue(e.target.value)
                            }}
                            value={inputValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="light:bg-gray-50 ml-4 px-4 py-3 sm:px-6">
                  <button
                    type="submit"
                    className="light:bg-black mb-2 w-full justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 "
                  >
                    {uploading && (
                      <>
                        <FontAwesomeIcon
                          icon={faCircleNotch}
                          spin
                          className="mr-2 h-5 w-5 text-white"
                        />
                      </>
                    )}
                    Gửi ngay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
