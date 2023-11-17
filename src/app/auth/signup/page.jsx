'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from './Modal/ConfirmationModal'
import logo from '@/images/logos/logo.png'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const Register = () => {
  const [error, setError] = useState(null)
  const [samePass, setSamePass] = useState(false)
  const [previewImg, setPreviewImg] = useState()
  const [uploading, setUploading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [capcha, setCapcha] = useState()
  const [email, setEmail] = useState()
  const [avatarUrl, setAvatarUrl] = useState()
  const router = useRouter()
  const form = useRef()
  const submitButtonRef = useRef()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error2, isLoading } = useSWR('/api/auth/user', fetcher)
  const userList = []
  data?.forEach((user) => {
    if (user.email) {
      userList.push(user.email)
    }
  })
  console.log(userList)
  useEffect(() => {
    setCapcha(generateCapcha())
  }, [])
  function closeModal() {
    setIsOpen(false)
  }
  const generateCapcha = () => {
    return Math.floor(Math.random() * 100000 + 1)
  }
  const generate = async () => {
    if (!email) {
      setError('Vui lòng điền đầy đủ thông tin!')
      setTimeout(() => {
        setError(null)
      }, 2000)
    } else if (userList.includes(email)) {
      toast.error('Email đã được đăng ký, vui lòng dùng tài khoản khác!')
    } else {
      await emailjs
        .sendForm(
          'service_u2abmk7',
          'template_dbv1sen',
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
      setIsOpen(true)
    }
  }

  const handlePreviewImage = (e) => {
    const selectedFile = e.target.files[0]
    selectedFile.preview = URL.createObjectURL(selectedFile)
    setPreviewImg(selectedFile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      if (previewImg) {
        const formData = new FormData()
        formData.append('file', previewImg)
        formData.append('upload_preset', 'user_avatar')

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dcebbdzlq/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        )
        const data = await response.json()
        setAvatarUrl(data.secure_url)
      }

      const fullname = e.target[2].value
      const email = e.target[3].value
      const dob = e.target[4].value
      const password = e.target[5].value

      if (password) {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              avatar: previewImg
                ? avatarUrl
                : 'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg',
              fullname,
              email,
              dob,
              password,
              role: 'User',
            }),
          })
          toast.success('Tạo tài khoản thành công!')
          res.status === 201 &&
            router.push('/auth/login?success=Account has been created!')
        } catch (err) {
          setError(err)
          console.log(err)
        }
      } else setSamePass(true)
    } catch (err) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
      console.log(err)
      setUploading(false)
    }
  }
  useEffect(() => {
    return () => {
      previewImg && URL.revokeObjectURL(previewImg.preview)
    }
  }, [previewImg])

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-28 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Tạo tài khoản
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} ref={form}>
            <input className="hidden" name="capcha" value={capcha} required />
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Avatar
              </label>
              <div className="mt-2 block items-center gap-x-3">
                {previewImg ? (
                  <img
                    src={previewImg.preview}
                    className="my-2 h-20 w-20 rounded-full"
                  />
                ) : (
                  <UserCircleIcon
                    className="h-20 w-20 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <input
                  type="file"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onChange={handlePreviewImage}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Họ và tên
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-200 sm:text-sm sm:leading-6"
                  placeholder="Vd: Nguyễn Thanh Tâm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                Địa chỉ Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-200 sm:text-sm sm:leading-6"
                  placeholder="Vd: user@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Ngày sinh
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-200 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              {samePass && (
                <p className="py-1 text-sm font-medium text-red-500">
                  Vui lòng điền đầy đủ thông tin!
                </p>
              )}
            </div>
            <button className="hidden" type="submit" ref={submitButtonRef}>
              sign up trick
            </button>
            <div>
              <button
                className="relative w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-sky-500"
                disabled={uploading}
                onClick={async (e) => {
                  e.preventDefault()
                  await generate()
                }}
              >
                <div className="flex items-center justify-center">
                  {uploading && (
                    <>
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        className="mr-2 h-5 w-5 text-indigo-500"
                      />
                    </>
                  )}
                  Đăng ký
                </div>
              </button>
              <p className="my-2 font-medium text-red-500"> {error && error}</p>
            </div>
          </form>

          <p className="mt-20 text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link
              className="ml-2 inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
              href="/auth/login"
            >
              <span className="dark:text-sky-500">
                Đăng nhập <span aria-hidden="true">→</span>
              </span>
            </Link>
          </p>
        </div>
      </div>
      {modalIsOpen && (
        <ConfirmationModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          code={capcha}
          email={email}
          submitButtonRef={submitButtonRef}
        />
      )}
    </div>
  )
}

export default Register
